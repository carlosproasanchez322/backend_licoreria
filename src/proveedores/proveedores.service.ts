import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';

@Injectable()
export class ProveedoresService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProveedorDto) {
    const proveedor = await this.prisma.proveedor.create({ data: dto });
    return this.mapProveedor(proveedor);
  }

  async findAll() {
    const proveedores = await this.prisma.proveedor.findMany({
      include: { _count: { select: { compras: true } } },
      orderBy: { razonSocial: 'asc' },
    });
    return proveedores.map((p) => this.mapProveedor(p));
  }

  async findOne(id: number) {
    const proveedor = await this.prisma.proveedor.findUnique({
      where: { idProveedor: id },
      include: { _count: { select: { compras: true } } },
    });

    if (!proveedor) {
      throw new NotFoundException('Proveedor no encontrado');
    }

    return this.mapProveedor(proveedor);
  }

  async update(id: number, dto: UpdateProveedorDto) {
    await this.findOne(id);
    const proveedor = await this.prisma.proveedor.update({
      where: { idProveedor: id },
      data: dto,
      include: { _count: { select: { compras: true } } },
    });
    return this.mapProveedor(proveedor);
  }

  async remove(id: number) {
    const compras = await this.prisma.compra.count({
      where: { idProveedor: id },
    });
    if (compras > 0) {
      throw new ConflictException('El proveedor tiene compras asociadas');
    }

    const proveedor = await this.prisma.proveedor.delete({
      where: { idProveedor: id },
    });
    return this.mapProveedor(proveedor);
  }

  private mapProveedor(proveedor: {
    idProveedor: number;
    razonSocial: string;
    ruc?: string | null;
    telefono?: string | null;
    email?: string | null;
    direccion?: string | null;
    _count?: { compras: number };
  }) {
    const { idProveedor, ...rest } = proveedor;
    return { id: idProveedor, ...rest };
  }
}
