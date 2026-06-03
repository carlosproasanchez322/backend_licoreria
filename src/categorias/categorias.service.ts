import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCategoriaDto) {
    const categoria = await this.prisma.categoria.create({ data: dto });
    return this.mapCategoria(categoria);
  }

  async findAll() {
    const categorias = await this.prisma.categoria.findMany({
      include: { _count: { select: { productos: true } } },
      orderBy: { nombre: 'asc' },
    });
    return categorias.map((c) => this.mapCategoria(c));
  }

  async findOne(id: number) {
    const categoria = await this.prisma.categoria.findUnique({
      where: { idCategoria: id },
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

    if (!categoria) {
      throw new NotFoundException('Categoría no encontrada');
    }

    return this.mapCategoria(categoria);
  }

  async update(id: number, dto: UpdateCategoriaDto) {
    await this.findOne(id);
    const categoria = await this.prisma.categoria.update({
      where: { idCategoria: id },
      data: dto,
      include: { _count: { select: { productos: true } } },
    });
    return this.mapCategoria(categoria);
  }

  async remove(id: number) {
    const productos = await this.prisma.producto.count({
      where: { idCategoria: id },
    });
    if (productos > 0) {
      throw new ConflictException('La categoría tiene productos asociados');
    }

    const categoria = await this.prisma.categoria.delete({
      where: { idCategoria: id },
    });
    return this.mapCategoria(categoria);
  }

  private mapCategoria(categoria: {
    idCategoria: number;
    nombre: string;
    descripcion?: string | null;
    _count?: { productos: number };
    productos?: Array<{
      idProducto: number;
      nombre: string;
      precioVenta: unknown;
      stock: number;
    }>;
  }) {
    const { idCategoria, productos, ...rest } = categoria;
    return {
      id: idCategoria,
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
