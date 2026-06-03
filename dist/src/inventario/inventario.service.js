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
exports.InventarioService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let InventarioService = class InventarioService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    kardex(idProducto) {
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
    async registrarMovimiento(dto) {
        const producto = await this.prisma.producto.findUnique({
            where: { idProducto: dto.idProducto },
        });
        if (!producto) {
            throw new common_1.BadRequestException('Producto no encontrado');
        }
        const tipo = dto.tipoMovimiento.toUpperCase();
        const esSalida = tipo === 'SALIDA' || tipo === 'VENTA';
        if (esSalida && producto.stock < dto.cantidad) {
            throw new common_1.BadRequestException('Stock insuficiente');
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
};
exports.InventarioService = InventarioService;
exports.InventarioService = InventarioService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InventarioService);
//# sourceMappingURL=inventario.service.js.map