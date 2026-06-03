import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { MarcasService } from './marcas.service';
export declare class MarcasController {
    private readonly marcasService;
    constructor(marcasService: MarcasService);
    create(body: CreateMarcaDto): Promise<{
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
    findOne(id: string): Promise<{
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
    update(id: string, body: UpdateMarcaDto): Promise<{
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
    remove(id: string): Promise<{
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
}
