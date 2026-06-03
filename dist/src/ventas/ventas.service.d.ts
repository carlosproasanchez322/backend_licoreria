import { PrismaService } from '../prisma/prisma.service';
import { CreateVentaDto } from './dto/create-venta.dto';
export declare class VentasService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateVentaDto, idUsuario: number): Promise<{
        usuario: {
            idUsuario: number;
            usuario: string;
            nombres: string;
            apellidos: string;
        };
        detalles: ({
            producto: {
                nombre: string;
                idUnidad: number;
                idCategoria: number;
                descripcion: string | null;
                idMarca: number | null;
                idProducto: number;
                codigoBarra: string | null;
                precioCompra: import("@prisma/client-runtime-utils").Decimal;
                precioVenta: import("@prisma/client-runtime-utils").Decimal;
                stock: number;
                stockMinimo: number;
                tieneIgv: boolean;
                esLicor: boolean;
                gradoAlcohol: import("@prisma/client-runtime-utils").Decimal | null;
                fechaVencimiento: Date | null;
            };
        } & {
            idProducto: number;
            subtotal: import("@prisma/client-runtime-utils").Decimal;
            cantidad: number;
            idDetalle: number;
            idVenta: number;
            precioUnitario: import("@prisma/client-runtime-utils").Decimal;
            descuento: import("@prisma/client-runtime-utils").Decimal;
        })[];
        metodo: {
            idMetodo: number;
            nombre: string;
        };
    } & {
        idMetodo: number;
        idUsuario: number;
        idCliente: number | null;
        fecha: Date;
        subtotal: import("@prisma/client-runtime-utils").Decimal;
        igv: import("@prisma/client-runtime-utils").Decimal;
        total: import("@prisma/client-runtime-utils").Decimal;
        tipoComprobante: string | null;
        numeroComprobante: string | null;
        idVenta: number;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        usuario: {
            idUsuario: number;
            usuario: string;
            nombres: string;
        };
        detalles: ({
            producto: {
                nombre: string;
                idUnidad: number;
                idCategoria: number;
                descripcion: string | null;
                idMarca: number | null;
                idProducto: number;
                codigoBarra: string | null;
                precioCompra: import("@prisma/client-runtime-utils").Decimal;
                precioVenta: import("@prisma/client-runtime-utils").Decimal;
                stock: number;
                stockMinimo: number;
                tieneIgv: boolean;
                esLicor: boolean;
                gradoAlcohol: import("@prisma/client-runtime-utils").Decimal | null;
                fechaVencimiento: Date | null;
            };
        } & {
            idProducto: number;
            subtotal: import("@prisma/client-runtime-utils").Decimal;
            cantidad: number;
            idDetalle: number;
            idVenta: number;
            precioUnitario: import("@prisma/client-runtime-utils").Decimal;
            descuento: import("@prisma/client-runtime-utils").Decimal;
        })[];
        metodo: {
            idMetodo: number;
            nombre: string;
        };
    } & {
        idMetodo: number;
        idUsuario: number;
        idCliente: number | null;
        fecha: Date;
        subtotal: import("@prisma/client-runtime-utils").Decimal;
        igv: import("@prisma/client-runtime-utils").Decimal;
        total: import("@prisma/client-runtime-utils").Decimal;
        tipoComprobante: string | null;
        numeroComprobante: string | null;
        idVenta: number;
    })[]>;
    findOne(id: number): Promise<{
        usuario: {
            idUsuario: number;
            usuario: string;
            nombres: string;
            apellidos: string;
        };
        cliente: {
            telefono: string | null;
            email: string | null;
            direccion: string | null;
            nombres: string | null;
            apellidos: string | null;
            idCliente: number;
            tipoDocumento: string | null;
            numeroDocumento: string | null;
        } | null;
        detalles: ({
            producto: {
                nombre: string;
                idUnidad: number;
                idCategoria: number;
                descripcion: string | null;
                idMarca: number | null;
                idProducto: number;
                codigoBarra: string | null;
                precioCompra: import("@prisma/client-runtime-utils").Decimal;
                precioVenta: import("@prisma/client-runtime-utils").Decimal;
                stock: number;
                stockMinimo: number;
                tieneIgv: boolean;
                esLicor: boolean;
                gradoAlcohol: import("@prisma/client-runtime-utils").Decimal | null;
                fechaVencimiento: Date | null;
            };
        } & {
            idProducto: number;
            subtotal: import("@prisma/client-runtime-utils").Decimal;
            cantidad: number;
            idDetalle: number;
            idVenta: number;
            precioUnitario: import("@prisma/client-runtime-utils").Decimal;
            descuento: import("@prisma/client-runtime-utils").Decimal;
        })[];
        metodo: {
            idMetodo: number;
            nombre: string;
        };
    } & {
        idMetodo: number;
        idUsuario: number;
        idCliente: number | null;
        fecha: Date;
        subtotal: import("@prisma/client-runtime-utils").Decimal;
        igv: import("@prisma/client-runtime-utils").Decimal;
        total: import("@prisma/client-runtime-utils").Decimal;
        tipoComprobante: string | null;
        numeroComprobante: string | null;
        idVenta: number;
    }>;
    resumenDia(): import("@prisma/client").Prisma.PrismaPromise<import("@prisma/client").Prisma.GetVentaAggregateType<{
        where: {
            fecha: {
                gte: Date;
            };
        };
        _sum: {
            total: true;
            subtotal: true;
            igv: true;
        };
        _count: {
            idVenta: true;
        };
    }>>;
    remove(id: number): Promise<{
        idMetodo: number;
        idUsuario: number;
        idCliente: number | null;
        fecha: Date;
        subtotal: import("@prisma/client-runtime-utils").Decimal;
        igv: import("@prisma/client-runtime-utils").Decimal;
        total: import("@prisma/client-runtime-utils").Decimal;
        tipoComprobante: string | null;
        numeroComprobante: string | null;
        idVenta: number;
    }>;
}
