import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { ProveedoresService } from './proveedores.service';
export declare class ProveedoresController {
    private readonly proveedoresService;
    constructor(proveedoresService: ProveedoresService);
    create(body: CreateProveedorDto): Promise<{
        razonSocial: string;
        ruc?: string | null;
        telefono?: string | null;
        email?: string | null;
        direccion?: string | null;
        _count?: {
            compras: number;
        };
        id: number;
    }>;
    findAll(): Promise<{
        razonSocial: string;
        ruc?: string | null;
        telefono?: string | null;
        email?: string | null;
        direccion?: string | null;
        _count?: {
            compras: number;
        };
        id: number;
    }[]>;
    findOne(id: string): Promise<{
        razonSocial: string;
        ruc?: string | null;
        telefono?: string | null;
        email?: string | null;
        direccion?: string | null;
        _count?: {
            compras: number;
        };
        id: number;
    }>;
    update(id: string, body: UpdateProveedorDto): Promise<{
        razonSocial: string;
        ruc?: string | null;
        telefono?: string | null;
        email?: string | null;
        direccion?: string | null;
        _count?: {
            compras: number;
        };
        id: number;
    }>;
    remove(id: string): Promise<{
        razonSocial: string;
        ruc?: string | null;
        telefono?: string | null;
        email?: string | null;
        direccion?: string | null;
        _count?: {
            compras: number;
        };
        id: number;
    }>;
}
