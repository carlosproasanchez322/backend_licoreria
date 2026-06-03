import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MovimientoInventarioDto } from './dto/movimiento-inventario.dto';

@Injectable()
export class InventarioService {
  constructor(private readonly prisma: PrismaService) {}

  kardex(idProducto?: number) {
    return this.prisma.movimientoInventario.findMany({
      where: idProducto ? { idProducto } : undefined,
      include: {
        producto: {
          select: { idProducto: true, nombre: true, codigoBarra: true },
        },
      },
      orderBy: { fecha: 'desc' },
    });
  }

  async registrarMovimiento(dto: MovimientoInventarioDto) {
    const producto = await this.prisma.producto.findUnique({
      where: { idProducto: dto.idProducto },
    });

    if (!producto) {
      throw new BadRequestException('Producto no encontrado');
    }

    const tipo = dto.tipoMovimiento.toUpperCase();
    const esSalida = tipo === 'SALIDA' || tipo === 'VENTA';

    if (esSalida && producto.stock < dto.cantidad) {
      throw new BadRequestException('Stock insuficiente');
    }

    const stockAnterior = producto.stock;
    const stockNuevo = esSalida
      ? stockAnterior - dto.cantidad
      : stockAnterior + dto.cantidad;

    return this.prisma.$transaction(async (tx) => {
      await tx.producto.update({
        where: { idProducto: dto.idProducto },
        data: { stock: stockNuevo },
      });

      return tx.movimientoInventario.create({
        data: {
          idProducto: dto.idProducto,
          tipoMovimiento: tipo,
          motivo: dto.motivo,
          cantidad: dto.cantidad,
          stockAnterior,
          stockNuevo,
        },
        include: { producto: true },
      });
    });
  }
}
