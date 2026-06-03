import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';

export type JwtPayload = {
  sub: number;
  usuario: string;
  rol?: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET ?? 'SECRET_KEY',
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.prisma.usuario.findUnique({
      where: { idUsuario: payload.sub },
      select: {
        idUsuario: true,
        nombres: true,
        apellidos: true,
        usuario: true,
        estado: true,
        rol: { select: { idRol: true, nombre: true } },
      },
    });

    if (!user || !user.estado) {
      throw new UnauthorizedException('Usuario no autorizado');
    }

    return {
      idUsuario: user.idUsuario,
      nombres: user.nombres,
      apellidos: user.apellidos,
      usuario: user.usuario,
      rol: user.rol.nombre,
    };
  }
}
