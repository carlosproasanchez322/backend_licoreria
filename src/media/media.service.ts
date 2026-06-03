import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MediaService {
  private readonly uploadDir = path.join(process.cwd(), 'uploads', 'productos');

  constructor(private readonly prisma: PrismaService) {
    this.ensureUploadDir();
  }

  private ensureUploadDir() {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async uploadMedia(
    idProducto: number,
    file: Express.Multer.File,
    esPrincipal: boolean = false,
  ) {
    // Verificar que el producto existe
    const producto = await this.prisma.producto.findUnique({
      where: { idProducto },
    });

    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }

    // Validar tipo de archivo
    const tiposPermitidos = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'video/mp4',
      'video/webm',
    ];

    if (!tiposPermitidos.includes(file.mimetype)) {
      throw new BadRequestException(
        'Tipo de archivo no permitido. Solo se permiten: JPG, PNG, WebP, MP4, WebM',
      );
    }

    // Validar tamaño (máximo 50MB)
    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new BadRequestException('El archivo es demasiado grande (máximo 50MB)');
    }

    // Determinar tipo (foto o video)
    const tipo = file.mimetype.startsWith('image') ? 'foto' : 'video';

    // Generar nombre único
    const timestamp = Date.now();
    const nombreArchivo = `${idProducto}_${timestamp}_${file.originalname}`;
    const rutaCompleta = path.join(this.uploadDir, nombreArchivo);

    // Guardar archivo
    fs.writeFileSync(rutaCompleta, file.buffer);

    // Si es principal, desmarcar otros como principal
    if (esPrincipal) {
      await this.prisma.mediaProducto.updateMany({
        where: { idProducto },
        data: { esPrincipal: false },
      });
    }

    // Guardar en BD
    const media = await this.prisma.mediaProducto.create({
      data: {
        idProducto,
        tipo,
        nombreArchivo,
        ruta: rutaCompleta,
        urlPublica: `/uploads/productos/${nombreArchivo}`,
        tamano: file.size,
        mimeType: file.mimetype,
        esPrincipal,
      },
    });

    return this.mapMedia(media);
  }

  async getMediaProducto(idProducto: number) {
    const media = await this.prisma.mediaProducto.findMany({
      where: { idProducto },
      orderBy: [{ esPrincipal: 'desc' }, { createdAt: 'desc' }],
    });

    return media.map((m) => this.mapMedia(m));
  }

  async getMediaPrincipal(idProducto: number) {
    const media = await this.prisma.mediaProducto.findFirst({
      where: { idProducto, esPrincipal: true },
    });

    if (!media) {
      return null;
    }

    return this.mapMedia(media);
  }

  async setMediaPrincipal(idMedia: number, idProducto: number) {
    const media = await this.prisma.mediaProducto.findUnique({
      where: { idMedia },
    });

    if (!media || media.idProducto !== idProducto) {
      throw new NotFoundException('Media no encontrada');
    }

    // Desmarcar otros como principal
    await this.prisma.mediaProducto.updateMany({
      where: { idProducto },
      data: { esPrincipal: false },
    });

    // Marcar este como principal
    const updated = await this.prisma.mediaProducto.update({
      where: { idMedia },
      data: { esPrincipal: true },
    });

    return this.mapMedia(updated);
  }

  async deleteMedia(idMedia: number, idProducto: number) {
    const media = await this.prisma.mediaProducto.findUnique({
      where: { idMedia },
    });

    if (!media || media.idProducto !== idProducto) {
      throw new NotFoundException('Media no encontrada');
    }

    // Eliminar archivo
    if (fs.existsSync(media.ruta)) {
      fs.unlinkSync(media.ruta);
    }

    // Eliminar de BD
    await this.prisma.mediaProducto.delete({
      where: { idMedia },
    });

    return { message: 'Media eliminada correctamente' };
  }

  async deleteAllMediaProducto(idProducto: number) {
    const mediaList = await this.prisma.mediaProducto.findMany({
      where: { idProducto },
    });

    // Eliminar archivos
    for (const media of mediaList) {
      if (fs.existsSync(media.ruta)) {
        fs.unlinkSync(media.ruta);
      }
    }

    // Eliminar de BD
    await this.prisma.mediaProducto.deleteMany({
      where: { idProducto },
    });

    return { message: 'Todos los archivos eliminados' };
  }

  private mapMedia(media: {
    idMedia: number;
    nombreArchivo: string;
    urlPublica: string | null;
    tipo: string;
    tamano: number;
    mimeType: string;
    esPrincipal: boolean;
    createdAt: Date;
  }) {
    return {
      id: media.idMedia,
      nombreArchivo: media.nombreArchivo,
      url: media.urlPublica,
      tipo: media.tipo,
      tamaño: media.tamano,
      mimeType: media.mimeType,
      esPrincipal: media.esPrincipal,
      createdAt: media.createdAt,
    };
  }
}
