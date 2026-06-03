import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
export declare class CategoriasController {
    private readonly categoriasService;
    constructor(categoriasService: CategoriasService);
    create(body: CreateCategoriaDto): Promise<{
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
    findOne(id: string): Promise<{
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
    update(id: string, body: UpdateCategoriaDto): Promise<{
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
    remove(id: string): Promise<{
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
}
