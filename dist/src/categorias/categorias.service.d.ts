import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
export declare class CategoriasService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateCategoriaDto): Promise<{
        productos: {
            idProducto: number;
            nombre: string;
            precioVenta: number;
            stock: number;
        }[] | undefined;
        nombre: string;
        descripcion?: string | null;
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
        descripcion?: string | null;
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
        descripcion?: string | null;
        _count?: {
            productos: number;
        };
        id: number;
    }>;
    update(id: number, dto: UpdateCategoriaDto): Promise<{
        productos: {
            idProducto: number;
            nombre: string;
            precioVenta: number;
            stock: number;
        }[] | undefined;
        nombre: string;
        descripcion?: string | null;
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
        descripcion?: string | null;
        _count?: {
            productos: number;
        };
        id: number;
    }>;
    private mapCategoria;
}
