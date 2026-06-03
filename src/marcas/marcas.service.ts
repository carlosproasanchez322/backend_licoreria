import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';

@Injectable()
export class MarcasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateMarcaDto) {
    const marca = await this.prisma.marca.create({ data: dto });
    return this.mapMarca(marca);
  }

  async findAll() {
    const marcas = await this.prisma.marca.findMany({
      include: { _count: { select: { productos: true } } },
      orderBy: { nombre: 'asc' },
    });
    return marcas.map((m) => this.mapMarca(m));
  }

  async findOne(id: number) {
    const marca = await this.prisma.marca.findUnique({
      where: { idMarca: id },
      include: {
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

    if (!marca) {
      throw new NotFoundException('Marca no encontrada');
    }

    return this.mapMarca(marca);
  }

  async update(id: number, dto: UpdateMarcaDto) {
    await this.findOne(id);
    const marca = await this.prisma.marca.update({
      where: { idMarca: id },
      data: dto,
      include: { _count: { select: { productos: true } } },
    });
    return this.mapMarca(marca);
  }

  async remove(id: number) {
    const productos = await this.prisma.producto.count({
      where: { idMarca: id },
    });
    if (productos > 0) {
      throw new ConflictException('La marca tiene productos asociados');
    }

    const marca = await this.prisma.marca.delete({ where: { idMarca: id } });
    return this.mapMarca(marca);
  }

  private mapMarca(marca: {
    idMarca: number;
    nombre: string;
    _count?: { productos: number };
    productos?: Array<{
      idProducto: number;
      nombre: string;
      precioVenta: unknown;
      stock: number;
    }>;
  }) {
    const { idMarca, productos, ...rest } = marca;
    return {
      id: idMarca,
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
