import { PrismaService } from '../prisma/prisma.service';
import { CreateUnidadDto } from './dto/create-unidad.dto';
import { UpdateUnidadDto } from './dto/update-unidad.dto';
export declare class UnidadesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateUnidadDto): Promise<{
        productos: {
            idProducto: number;
            nombre: string;
            precioVenta: number;
            stock: number;
        }[] | undefined;
        nombre: string;
        abreviatura: string;
        _count?: {
            productos: number;
        };
        id: number;
    }>;
    findAll(): Promise<{
        productos: {
            idProducto: number;
            nombre: string;
            precioVenta: number;
            stock: number;
        }[] | undefined;
        nombre: string;
        abreviatura: string;
        _count?: {
            productos: number;
        };
        id: number;
    }[]>;
    findOne(id: number): Promise<{
        productos: {
            idProducto: number;
            nombre: string;
            precioVenta: number;
            stock: number;
        }[] | undefined;
        nombre: string;
        abreviatura: string;
        _count?: {
            productos: number;
        };
        id: number;
    }>;
    update(id: number, dto: UpdateUnidadDto): Promise<{
        productos: {
            idProducto: number;
            nombre: string;
            precioVenta: number;
            stock: number;
        }[] | undefined;
        nombre: string;
        abreviatura: string;
        _count?: {
            productos: number;
        };
        id: number;
    }>;
    remove(id: number): Promise<{
        productos: {
            idProducto: number;
            nombre: string;
            precioVenta: number;
            stock: number;
        }[] | undefined;
        nombre: string;
        abreviatura: string;
        _count?: {
            productos: number;
        };
        id: number;
    }>;
    private mapUnidad;
}
