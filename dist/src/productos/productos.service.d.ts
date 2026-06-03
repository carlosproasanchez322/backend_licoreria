import { PrismaService } from '../prisma/prisma.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
export declare class ProductosService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateProductoDto): Promise<{
        precioCompra: number;
        precioVenta: number;
        categoria: {
            id: number;
            nombre: string;
            descripcion: string | null | undefined;
        };
        marca: {
            id: number;
            nombre: string;
        } | null;
        unidad: {
            id: number;
            nombre: string;
            abreviatura: string;
        };
        media: {
            id: number;
            tipo: string;
            nombreArchivo: string;
            ruta: string;
            urlPublica: string | null;
            tamano: number;
            mimeType: string;
            esPrincipal: boolean;
            createdAt: string;
            updatedAt: string;
        }[];
        id: number;
    }>;
    findAll(): Promise<{
        precioCompra: number;
        precioVenta: number;
        categoria: {
            id: number;
            nombre: string;
            descripcion: string | null | undefined;
        };
        marca: {
            id: number;
            nombre: string;
        } | null;
        unidad: {
            id: number;
            nombre: string;
            abreviatura: string;
        };
        media: {
            id: number;
            tipo: string;
            nombreArchivo: string;
            ruta: string;
            urlPublica: string | null;
            tamano: number;
            mimeType: string;
            esPrincipal: boolean;
            createdAt: string;
            updatedAt: string;
        }[];
        id: number;
    }[]>;
    findOne(id: number): Promise<{
        precioCompra: number;
        precioVenta: number;
        categoria: {
            id: number;
            nombre: string;
            descripcion: string | null | undefined;
        };
        marca: {
            id: number;
            nombre: string;
        } | null;
        unidad: {
            id: number;
            nombre: string;
            abreviatura: string;
        };
        media: {
            id: number;
            tipo: string;
            nombreArchivo: string;
            ruta: string;
            urlPublica: string | null;
            tamano: number;
            mimeType: string;
            esPrincipal: boolean;
            createdAt: string;
            updatedAt: string;
        }[];
        id: number;
    }>;
    update(id: number, data: UpdateProductoDto): Promise<{
        precioCompra: number;
        precioVenta: number;
        categoria: {
            id: number;
            nombre: string;
            descripcion: string | null | undefined;
        };
        marca: {
            id: number;
            nombre: string;
        } | null;
        unidad: {
            id: number;
            nombre: string;
            abreviatura: string;
        };
        media: {
            id: number;
            tipo: string;
            nombreArchivo: string;
            ruta: string;
            urlPublica: string | null;
            tamano: number;
            mimeType: string;
            esPrincipal: boolean;
            createdAt: string;
            updatedAt: string;
        }[];
        id: number;
    }>;
    remove(id: number): Promise<{
        precioCompra: number;
        precioVenta: number;
        categoria: {
            id: number;
            nombre: string;
            descripcion: string | null | undefined;
        };
        marca: {
            id: number;
            nombre: string;
        } | null;
        unidad: {
            id: number;
            nombre: string;
            abreviatura: string;
        };
        media: {
            id: number;
            tipo: string;
            nombreArchivo: string;
            ruta: string;
            urlPublica: string | null;
            tamano: number;
            mimeType: string;
            esPrincipal: boolean;
            createdAt: string;
            updatedAt: string;
        }[];
        id: number;
    }>;
    private includeRelaciones;
    private validarRelaciones;
    private mapProducto;
}
