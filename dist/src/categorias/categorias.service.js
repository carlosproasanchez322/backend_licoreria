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
exports.CategoriasService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CategoriasService = class CategoriasService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
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
    async findOne(id) {
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
            throw new common_1.NotFoundException('Categoría no encontrada');
        }
        return this.mapCategoria(categoria);
    }
    async update(id, dto) {
        await this.findOne(id);
        const categoria = await this.prisma.categoria.update({
            where: { idCategoria: id },
            data: dto,
            include: { _count: { select: { productos: true } } },
        });
        return this.mapCategoria(categoria);
    }
    async remove(id) {
        const productos = await this.prisma.producto.count({
            where: { idCategoria: id },
        });
        if (productos > 0) {
            throw new common_1.ConflictException('La categoría tiene productos asociados');
        }
        const categoria = await this.prisma.categoria.delete({
            where: { idCategoria: id },
        });
        return this.mapCategoria(categoria);
    }
    mapCategoria(categoria) {
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
};
exports.CategoriasService = CategoriasService;
exports.CategoriasService = CategoriasService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoriasService);
//# sourceMappingURL=categorias.service.js.map