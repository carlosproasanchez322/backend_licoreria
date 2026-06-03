"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VentasService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const IGV_RATE = 0.18;
let VentasService = class VentasService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, idUsuario) {
        const productoIds = dto.items.map((i) => i.idProducto);
        const productos = await this.prisma.producto.findMany({
            where: { idProducto: { in: productoIds } },
        });
        if (productos.length !== productoIds.length) {
            throw new common_1.NotFoundException('Uno o más productos no existen');
        }
        const productoMap = new Map(productos.map((p) => [p.idProducto, p]));
        for (const item of dto.items) {
            const producto = productoMap.get(item.idProducto);
            if (producto.stock < item.cantidad) {
                throw new common_1.BadRequestException(`Stock insuficiente para ${producto.nombre}. Disponible: ${producto.stock}`);
            }
        }
        let subtotal = 0;
        let igv = 0;
        const detalles = dto.items.map((item) => {
            const producto = productoMap.get(item.idProducto);
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
        let idMetodo = dto.idMetodo;
        if (idMetodo) {
            const metodo = await this.prisma.metodoPago.findUnique({
                where: { idMetodo },
            });
            if (!metodo) {
                throw new common_1.BadRequestException('Método de pago no existe');
            }
        }
        else {
            const metodo = await this.prisma.metodoPago.findFirst();
            if (!metodo) {
                throw new common_1.BadRequestException('No hay métodos de pago disponibles');
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
                const producto = productoMap.get(item.idProducto);
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
    async findOne(id) {
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
            throw new common_1.NotFoundException('Venta no encontrada');
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
    async remove(id) {
        const venta = await this.prisma.venta.findUnique({
            where: { idVenta: id },
            include: { detalles: true },
        });
        if (!venta) {
            throw new common_1.NotFoundException('Venta no encontrada');
        }
        return this.prisma.$transaction(async (tx) => {
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
            await tx.detalleVenta.deleteMany({
                where: { idVenta: id },
            });
            return tx.venta.delete({
                where: { idVenta: id },
            });
        });
    }
};
exports.VentasService = VentasService;
exports.VentasService = VentasService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VentasService);
//# sourceMappingURL=ventas.service.js.map