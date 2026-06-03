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
exports.UnidadesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UnidadesService = class UnidadesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
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
    async findOne(id) {
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
            throw new common_1.NotFoundException('Unidad de medida no encontrada');
        }
        return this.mapUnidad(unidad);
    }
    async update(id, dto) {
        await this.findOne(id);
        const unidad = await this.prisma.unidadMedida.update({
            where: { idUnidad: id },
            data: dto,
            include: { _count: { select: { productos: true } } },
        });
        return this.mapUnidad(unidad);
    }
    async remove(id) {
        const productos = await this.prisma.producto.count({
            where: { idUnidad: id },
        });
        if (productos > 0) {
            throw new common_1.ConflictException('La unidad tiene productos asociados');
        }
        const unidad = await this.prisma.unidadMedida.delete({
            where: { idUnidad: id },
        });
        return this.mapUnidad(unidad);
    }
    mapUnidad(unidad) {
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
};
exports.UnidadesService = UnidadesService;
exports.UnidadesService = UnidadesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UnidadesService);
//# sourceMappingURL=unidades.service.js.map