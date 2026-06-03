import { PrismaService } from '../prisma/prisma.service';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
export declare class MarcasService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateMarcaDto): Promise<{
        productos: {
            idProducto: number;
            nombre: string;
            precioVenta: number;
            stock: number;
        }[] | undefined;
        nombre: string;
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
        _count?: {
            productos: number;
        };
        id: number;
    }>;
    update(id: number, dto: UpdateMarcaDto): Promise<{
        productos: {
            idProducto: number;
            nombre: string;
            precioVenta: number;
            stock: number;
        }[] | undefined;
        nombre: string;
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
        _count?: {
            productos: number;
        };
        id: number;
    }>;
    private mapMarca;
}
