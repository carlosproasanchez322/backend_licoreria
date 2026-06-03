import { CreateUnidadDto } from './dto/create-unidad.dto';
import { UpdateUnidadDto } from './dto/update-unidad.dto';
import { UnidadesService } from './unidades.service';
export declare class UnidadesController {
    private readonly unidadesService;
    constructor(unidadesService: UnidadesService);
    create(body: CreateUnidadDto): Promise<{
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
    findOne(id: string): Promise<{
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
    update(id: string, body: UpdateUnidadDto): Promise<{
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
    remove(id: string): Promise<{
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
}
