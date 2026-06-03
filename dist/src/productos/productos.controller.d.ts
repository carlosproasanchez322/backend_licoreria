import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ProductosService } from './productos.service';
export declare class ProductosController {
    private readonly productosService;
    constructor(productosService: ProductosService);
    create(body: CreateProductoDto): Promise<{
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
    findOne(id: string): Promise<{
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
    update(id: string, body: UpdateProductoDto): Promise<{
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
    remove(id: string): Promise<{
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
}
