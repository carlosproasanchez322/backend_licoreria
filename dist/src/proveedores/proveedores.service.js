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
exports.ProveedoresService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProveedoresService = class ProveedoresService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
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
    async findOne(id) {
        const proveedor = await this.prisma.proveedor.findUnique({
            where: { idProveedor: id },
            include: { _count: { select: { compras: true } } },
        });
        if (!proveedor) {
            throw new common_1.NotFoundException('Proveedor no encontrado');
        }
        return this.mapProveedor(proveedor);
    }
    async update(id, dto) {
        await this.findOne(id);
        const proveedor = await this.prisma.proveedor.update({
            where: { idProveedor: id },
            data: dto,
            include: { _count: { select: { compras: true } } },
        });
        return this.mapProveedor(proveedor);
    }
    async remove(id) {
        const compras = await this.prisma.compra.count({
            where: { idProveedor: id },
        });
        if (compras > 0) {
            throw new common_1.ConflictException('El proveedor tiene compras asociadas');
        }
        const proveedor = await this.prisma.proveedor.delete({
            where: { idProveedor: id },
        });
        return this.mapProveedor(proveedor);
    }
    mapProveedor(proveedor) {
        const { idProveedor, ...rest } = proveedor;
        return { id: idProveedor, ...rest };
    }
};
exports.ProveedoresService = ProveedoresService;
exports.ProveedoresService = ProveedoresService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProveedoresService);
//# sourceMappingURL=proveedores.service.js.map