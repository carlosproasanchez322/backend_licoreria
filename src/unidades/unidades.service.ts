import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUnidadDto } from './dto/create-unidad.dto';
import { UpdateUnidadDto } from './dto/update-unidad.dto';

@Injectable()
export class UnidadesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUnidadDto) {
    const unidad = await this.prisma.unidadMedida.create({ data: dto });
    return this.mapUnidad(unidad);
  }

  async findAll() {
    const unidades = await this.prisma.unidadMedida.findMany({
      include: { _count: { select: { productos: true } } },
      orderBy: { nombre: 'asc' },
    });
    return unidades.map((u) => this.mapUnidad(u));
  }

  async findOne(id: number) {
    const unidad = await this.prisma.unidadMedida.findUnique({
      where: { idUnidad: id },
      include: {
        _count: { select: { productos: true } },
        productos: {
          select: {
            idProducto: true,
            nombre: true,
            precioVenta: true,
            stock: true,
          },
        },
      },
    });

    if (!unidad) {
      throw new NotFoundException('Unidad de medida no encontrada');
    }

    return this.mapUnidad(unidad);
  }

  async update(id: number, dto: UpdateUnidadDto) {
    await this.findOne(id);
    const unidad = await this.prisma.unidadMedida.update({
      where: { idUnidad: id },
      data: dto,
      include: { _count: { select: { productos: true } } },
    });
    return this.mapUnidad(unidad);
  }

  async remove(id: number) {
    const productos = await this.prisma.producto.count({
      where: { idUnidad: id },
    });
    if (productos > 0) {
      throw new ConflictException('La unidad tiene productos asociados');
    }

    const unidad = await this.prisma.unidadMedida.delete({
      where: { idUnidad: id },
    });
    return this.mapUnidad(unidad);
  }

  private mapUnidad(unidad: {
    idUnidad: number;
    nombre: string;
    abreviatura: string;
    _count?: { productos: number };
    productos?: Array<{
      idProducto: number;
      nombre: string;
      precioVenta: unknown;
      stock: number;
    }>;
  }) {
    const { idUnidad, productos, ...rest } = unidad;
    return {
      id: idUnidad,
      ...rest,
      productos: productos?.map((p) => ({
        idProducto: p.idProducto,
        nombre: p.nombre,
        precioVenta: Number(p.precioVenta),
        stock: p.stock,
      })),
    };
  }
}
