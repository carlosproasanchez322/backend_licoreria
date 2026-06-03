import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService) {}

  private selectFields = {
    idUsuario: true,
    nombres: true,
    apellidos: true,
    usuario: true,
    estado: true,
    idRol: true,
    rol: { select: { idRol: true, nombre: true } },
  };

  async create(createUsuarioDto: CreateUsuarioDto) {
    // Validar que usuario no exista
    const usuarioExistente = await this.prisma.usuario.findUnique({
      where: { usuario: createUsuarioDto.usuario },
    });

    if (usuarioExistente) {
      throw new ConflictException('El usuario ya existe');
    }

    // Validar que el rol existe
    const rolExistente = await this.prisma.rol.findUnique({
      where: { idRol: createUsuarioDto.idRol },
    });

    if (!rolExistente) {
      throw new BadRequestException('El rol especificado no existe');
    }

    // Hash de la contraseña
    const passwordHash = await bcrypt.hash(createUsuarioDto.password, 10);

    try {
      return await this.prisma.usuario.create({
        data: {
          nombres: createUsuarioDto.nombres,
          apellidos: createUsuarioDto.apellidos,
          usuario: createUsuarioDto.usuario,
          passwordHash,
          idRol: createUsuarioDto.idRol,
          estado: createUsuarioDto.estado ?? true,
        },
        select: this.selectFields,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('El usuario ya existe');
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.usuario.findMany({
      select: this.selectFields,
      orderBy: { idUsuario: 'desc' },
    });
  }

  async findOne(id: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { idUsuario: id },
      select: this.selectFields,
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return usuario;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    // Verificar que el usuario existe
    const usuario = await this.prisma.usuario.findUnique({
      where: { idUsuario: id },
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Validar que el nuevo usuario no exista (si se intenta cambiar)
    if (
      updateUsuarioDto.usuario &&
      updateUsuarioDto.usuario !== usuario.usuario
    ) {
      const usuarioExistente = await this.prisma.usuario.findUnique({
        where: { usuario: updateUsuarioDto.usuario },
      });

      if (usuarioExistente) {
        throw new ConflictException('El usuario ya existe');
      }
    }

    // Validar que el rol existe (si se intenta cambiar)
    if (updateUsuarioDto.idRol) {
      const rolExistente = await this.prisma.rol.findUnique({
        where: { idRol: updateUsuarioDto.idRol },
      });

      if (!rolExistente) {
        throw new BadRequestException('El rol especificado no existe');
      }
    }

    // Preparar datos para actualizar
    const dataToUpdate: any = {
      nombres: updateUsuarioDto.nombres,
      apellidos: updateUsuarioDto.apellidos,
      usuario: updateUsuarioDto.usuario,
      idRol: updateUsuarioDto.idRol,
      estado: updateUsuarioDto.estado,
    };

    // Hash de la contraseña si se proporciona
    if (updateUsuarioDto.password) {
      dataToUpdate.passwordHash = await bcrypt.hash(
        updateUsuarioDto.password,
        10
      );
    }

    // Remover propiedades undefined
    Object.keys(dataToUpdate).forEach(
      (key) => dataToUpdate[key] === undefined && delete dataToUpdate[key]
    );

    try {
      return await this.prisma.usuario.update({
        where: { idUsuario: id },
        data: dataToUpdate,
        select: this.selectFields,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('El usuario ya existe');
      }
      throw error;
    }
  }

  async remove(id: number) {
    // Verificar que el usuario existe
    const usuario = await this.prisma.usuario.findUnique({
      where: { idUsuario: id },
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    try {
      return await this.prisma.usuario.delete({
        where: { idUsuario: id },
        select: this.selectFields,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Usuario no encontrado');
      }
      throw error;
    }
  }

  async getRoles() {
    return this.prisma.rol.findMany({
      select: { idRol: true, nombre: true },
      orderBy: { nombre: 'asc' },
    });
  }
}
