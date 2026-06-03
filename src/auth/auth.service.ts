import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    const userExists = await this.prisma.usuario.findUnique({
      where: { usuario: data.usuario },
    });

    if (userExists) {
      throw new BadRequestException('Usuario ya existe');
    }

    const rolAdmin = await this.prisma.rol.findFirst({
      where: { nombre: 'ADMIN' },
    });

    if (!rolAdmin) {
      throw new BadRequestException(
        'No existe el rol ADMIN. Ejecuta: npm run db:seed',
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.usuario.create({
      data: {
        nombres: data.nombres,
        apellidos: data.apellidos,
        usuario: data.usuario,
        passwordHash: hashedPassword,
        idRol: rolAdmin.idRol,
      },
      select: {
        idUsuario: true,
        nombres: true,
        apellidos: true,
        usuario: true,
        estado: true,
        idRol: true,
        rol: { select: { idRol: true, nombre: true } },
      },
    });

    return user;
  }

  async login(data: LoginDto) {
    const user = await this.prisma.usuario.findUnique({
      where: { usuario: data.usuario },
      include: { rol: true },
    });

    if (!user || !user.estado) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const passwordMatch = await bcrypt.compare(
      data.password,
      user.passwordHash,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const payload = {
      sub: user.idUsuario,
      usuario: user.usuario,
      rol: user.rol.nombre,
    };

    return {
      access_token: this.jwtService.sign(payload),
      usuario: {
        idUsuario: user.idUsuario,
        nombres: user.nombres,
        apellidos: user.apellidos,
        usuario: user.usuario,
        estado: user.estado,
        idRol: user.idRol,
        rol: {
          idRol: user.rol.idRol,
          nombre: user.rol.nombre,
        },
      },
    };
  }

  async getProfile(userId: number) {
    const user = await this.prisma.usuario.findUnique({
      where: { idUsuario: userId },
      select: {
        idUsuario: true,
        nombres: true,
        apellidos: true,
        usuario: true,
        estado: true,
        rol: { select: { idRol: true, nombre: true } },
      },
    });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    return user;
  }
}
