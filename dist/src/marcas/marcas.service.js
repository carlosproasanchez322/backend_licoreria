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
exports.MarcasService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MarcasService = class MarcasService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
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
    async findOne(id) {
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
            throw new common_1.NotFoundException('Marca no encontrada');
        }
        return this.mapMarca(marca);
    }
    async update(id, dto) {
        await this.findOne(id);
        const marca = await this.prisma.marca.update({
            where: { idMarca: id },
            data: dto,
            include: { _count: { select: { productos: true } } },
        });
        return this.mapMarca(marca);
    }
    async remove(id) {
        const productos = await this.prisma.producto.count({
            where: { idMarca: id },
        });
        if (productos > 0) {
            throw new common_1.ConflictException('La marca tiene productos asociados');
        }
        const marca = await this.prisma.marca.delete({ where: { idMarca: id } });
        return this.mapMarca(marca);
    }
    mapMarca(marca) {
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
};
exports.MarcasService = MarcasService;
exports.MarcasService = MarcasService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MarcasService);
//# sourceMappingURL=marcas.service.js.map