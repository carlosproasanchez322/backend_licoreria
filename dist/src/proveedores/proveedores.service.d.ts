import { PrismaService } from '../prisma/prisma.service';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
export declare class ProveedoresService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateProveedorDto): Promise<{
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
    findOne(id: number): Promise<{
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
    update(id: number, dto: UpdateProveedorDto): Promise<{
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
    remove(id: number): Promise<{
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
    private mapProveedor;
}
