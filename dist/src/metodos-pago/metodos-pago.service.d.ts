import { PrismaService } from '../prisma/prisma.service';
export declare class MetodosPagoService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        idMetodo: number;
        nombre: string;
    }[]>;
    findOne(id: number): Promise<{
        idMetodo: number;
        nombre: string;
    } | null>;
}
