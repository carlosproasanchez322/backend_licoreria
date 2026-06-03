import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVentaDto } from './dto/create-venta.dto';

const IGV_RATE = 0.18;

@Injectable()
export class VentasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateVentaDto, idUsuario: number) {
    const productoIds = dto.items.map((i) => i.idProducto);
    const productos = await this.prisma.producto.findMany({
      where: { idProducto: { in: productoIds } },
    });

    if (productos.length !== productoIds.length) {
      throw new NotFoundException('Uno o más productos no existen');
    }

    const productoMap = new Map(productos.map((p) => [p.idProducto, p]));

    for (const item of dto.items) {
      const producto = productoMap.get(item.idProducto)!;
      if (producto.stock < item.cantidad) {
        throw new BadRequestException(
          `Stock insuficiente para ${producto.nombre}. Disponible: ${producto.stock}`,
        );
      }
    }

    let subtotal = 0;
    let igv = 0;

    const detalles = dto.items.map((item) => {
      const producto = productoMap.get(item.idProducto)!;
      const precio = Number(producto.precioVenta);
      const descuento = item.descuento ?? 0;
      const lineSubtotal = precio * item.cantidad - descuento;
      subtotal += lineSubtotal;

      if (producto.tieneIgv) {
        igv += lineSubtotal * IGV_RATE;
      }

      return {
        idProducto: item.idProducto,
        cantidad: item.cantidad,
        precioUnitario: precio,
        descuento,
        subtotal: lineSubtotal,
      };
    });

    const total = subtotal + igv;
    
    // Validar que el método de pago existe
    let idMetodo = dto.idMetodo;
    if (idMetodo) {
      const metodo = await this.prisma.metodoPago.findUnique({
        where: { idMetodo },
      });
      if (!metodo) {
        throw new BadRequestException('Método de pago no existe');
      }
    } else {
      // Obtener el primer método de pago disponible
      const metodo = await this.prisma.metodoPago.findFirst();
      if (!metodo) {
        throw new BadRequestException('No hay métodos de pago disponibles');
      }
      idMetodo = metodo.idMetodo;
    }

    return this.prisma.$transaction(async (tx) => {
      const venta = await tx.venta.create({
        data: {
          subtotal,
          igv,
          total,
          idUsuario,
          idMetodo,
          idCliente: dto.idCliente,
          tipoComprobante: dto.tipoComprobante,
          numeroComprobante: dto.numeroComprobante,
          detalles: { create: detalles },
        },
        include: {
          detalles: { include: { producto: true } },
          usuario: {
            select: {
              idUsuario: true,
              nombres: true,
              apellidos: true,
              usuario: true,
            },
          },
          metodo: true,
        },
      });

      for (const item of dto.items) {
        const producto = productoMap.get(item.idProducto)!;
        const stockAnterior = producto.stock;
        const stockNuevo = stockAnterior - item.cantidad;

        await tx.producto.update({
          where: { idProducto: item.idProducto },
          data: { stock: stockNuevo },
        });

        await tx.movimientoInventario.create({
          data: {
            idProducto: item.idProducto,
            tipoMovimiento: 'SALIDA',
            motivo: 'VENTA',
            cantidad: item.cantidad,
            stockAnterior,
            stockNuevo,
          },
        });

        producto.stock = stockNuevo;
      }

      return venta;
    });
  }

  findAll() {
    return this.prisma.venta.findMany({
      include: {
        usuario: {
          select: { idUsuario: true, nombres: true, usuario: true },
        },
        metodo: true,
        detalles: { include: { producto: true } },
      },
      orderBy: { fecha: 'desc' },
    });
  }

  async findOne(id: number) {
    const venta = await this.prisma.venta.findUnique({
      where: { idVenta: id },
      include: {
        usuario: {
          select: {
            idUsuario: true,
            nombres: true,
            apellidos: true,
            usuario: true,
          },
        },
        metodo: true,
        cliente: true,
        detalles: { include: { producto: true } },
      },
    });

    if (!venta) {
      throw new NotFoundException('Venta no encontrada');
    }

    return venta;
  }

  resumenDia() {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    return this.prisma.venta.aggregate({
      where: { fecha: { gte: hoy } },
      _sum: { total: true, subtotal: true, igv: true },
      _count: { idVenta: true },
    });
  }

  async remove(id: number) {
    const venta = await this.prisma.venta.findUnique({
      where: { idVenta: id },
      include: { detalles: true },
    });

    if (!venta) {
      throw new NotFoundException('Venta no encontrada');
    }

    return this.prisma.$transaction(async (tx) => {
      // Restaurar stock de productos
      for (const detalle of venta.detalles) {
        const producto = await tx.producto.findUnique({
          where: { idProducto: detalle.idProducto },
        });

        if (producto) {
          const stockAnterior = producto.stock;
          const stockNuevo = stockAnterior + detalle.cantidad;

          await tx.producto.update({
            where: { idProducto: detalle.idProducto },
            data: { stock: stockNuevo },
          });

          // Registrar movimiento de devolución
          await tx.movimientoInventario.create({
            data: {
              idProducto: detalle.idProducto,
              tipoMovimiento: 'ENTRADA',
              motivo: 'DEVOLUCIÓN VENTA',
              cantidad: detalle.cantidad,
              stockAnterior,
              stockNuevo,
            },
          });
        }
      }

      // Eliminar detalles y venta
      await tx.detalleVenta.deleteMany({
        where: { idVenta: id },
      });

      return tx.venta.delete({
        where: { idVenta: id },
      });
    });
  }
}