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
exports.ProductosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductosService = class ProductosService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        await this.validarRelaciones(data.idCategoria, data.idUnidad, data.idMarca);
        const createData = {
            nombre: data.nombre,
            descripcion: data.descripcion || null,
            precioCompra: data.precioCompra,
            precioVenta: data.precioVenta,
            stock: data.stock,
            codigoBarra: data.codigoBarra || null,
            idCategoria: data.idCategoria,
            idUnidad: data.idUnidad,
        };
        if (data.idMarca) {
            createData.idMarca = data.idMarca;
        }
        const producto = await this.prisma.producto.create({
            data: createData,
            include: this.includeRelaciones(),
        });
        return this.mapProducto(producto);
    }
    async findAll() {
        const productos = await this.prisma.producto.findMany({
            include: this.includeRelaciones(),
            orderBy: { idProducto: 'desc' },
        });
        return productos.map((p) => this.mapProducto(p));
    }
    async findOne(id) {
        const producto = await this.prisma.producto.findUnique({
            where: { idProducto: id },
            include: this.includeRelaciones(),
        });
        if (!producto) {
            throw new common_1.NotFoundException('Producto no encontrado');
        }
        return this.mapProducto(producto);
    }
    async update(id, data) {
        await this.findOne(id);
        if (data.idCategoria || data.idUnidad || data.idMarca) {
            await this.validarRelaciones(data.idCategoria, data.idUnidad, data.idMarca);
        }
        const updateData = {};
        if (data.nombre !== undefined)
            updateData.nombre = data.nombre;
        if (data.descripcion !== undefined)
            updateData.descripcion = data.descripcion || null;
        if (data.precioCompra !== undefined)
            updateData.precioCompra = data.precioCompra;
        if (data.precioVenta !== undefined)
            updateData.precioVenta = data.precioVenta;
        if (data.stock !== undefined)
            updateData.stock = data.stock;
        if (data.codigoBarra !== undefined)
            updateData.codigoBarra = data.codigoBarra || null;
        if (data.idCategoria !== undefined)
            updateData.idCategoria = data.idCategoria;
        if (data.idUnidad !== undefined)
            updateData.idUnidad = data.idUnidad;
        if (data.idMarca !== undefined)
            updateData.idMarca = data.idMarca || null;
        const producto = await this.prisma.producto.update({
            where: { idProducto: id },
            data: updateData,
            include: this.includeRelaciones(),
        });
        return this.mapProducto(producto);
    }
    async remove(id) {
        await this.findOne(id);
        const producto = await this.prisma.producto.delete({
            where: { idProducto: id },
            include: this.includeRelaciones(),
        });
        return this.mapProducto(producto);
    }
    includeRelaciones() {
        return {
            categoria: true,
            marca: true,
            unidad: true,
            media: true,
        };
    }
    async validarRelaciones(idCategoria, idUnidad, idMarca) {
        if (idCategoria) {
            const categoria = await this.prisma.categoria.findUnique({
                where: { idCategoria },
            });
            if (!categoria) {
                throw new common_1.BadRequestException('Categoría no existe');
            }
        }
        if (idUnidad) {
            const unidad = await this.prisma.unidadMedida.findUnique({
                where: { idUnidad },
            });
            if (!unidad) {
                throw new common_1.BadRequestException('Unidad de medida no existe');
            }
        }
        if (idMarca) {
            const marca = await this.prisma.marca.findUnique({
                where: { idMarca },
            });
            if (!marca) {
                throw new common_1.BadRequestException('Marca no existe');
            }
        }
    }
    mapProducto(producto) {
        const { idProducto, precioCompra, precioVenta, categoria, marca, unidad, media, ...rest } = producto;
        return {
            id: idProducto,
            ...rest,
            precioCompra: Number(precioCompra),
            precioVenta: Number(precioVenta),
            categoria: {
                id: categoria.idCategoria,
                nombre: categoria.nombre,
                descripcion: categoria.descripcion,
            },
            marca: marca
                ? { id: marca.idMarca, nombre: marca.nombre }
                : null,
            unidad: {
                id: unidad.idUnidad,
                nombre: unidad.nombre,
                abreviatura: unidad.abreviatura,
            },
            media: media?.map((m) => ({
                id: m.idMedia,
                tipo: m.tipo,
                nombreArchivo: m.nombreArchivo,
                ruta: m.ruta,
                urlPublica: m.urlPublica,
                tamano: m.tamano,
                mimeType: m.mimeType,
                esPrincipal: m.esPrincipal,
                createdAt: m.createdAt.toISOString(),
                updatedAt: m.updatedAt.toISOString(),
            })) || [],
        };
    }
};
exports.ProductosService = ProductosService;
exports.ProductosService = ProductosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductosService);
//# sourceMappingURL=productos.service.js.map