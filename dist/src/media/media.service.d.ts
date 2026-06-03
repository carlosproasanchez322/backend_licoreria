import { PrismaService } from '../prisma/prisma.service';
export declare class MediaService {
    private readonly prisma;
    private readonly uploadDir;
    constructor(prisma: PrismaService);
    private ensureUploadDir;
    uploadMedia(idProducto: number, file: Express.Multer.File, esPrincipal?: boolean): Promise<{
        id: number;
        nombreArchivo: string;
        url: string | null;
        tipo: string;
        tamaño: number;
        mimeType: string;
        esPrincipal: boolean;
        createdAt: Date;
    }>;
    getMediaProducto(idProducto: number): Promise<{
        id: number;
        nombreArchivo: string;
        url: string | null;
        tipo: string;
        tamaño: number;
        mimeType: string;
        esPrincipal: boolean;
        createdAt: Date;
    }[]>;
    getMediaPrincipal(idProducto: number): Promise<{
        id: number;
        nombreArchivo: string;
        url: string | null;
        tipo: string;
        tamaño: number;
        mimeType: string;
        esPrincipal: boolean;
        createdAt: Date;
    } | null>;
    setMediaPrincipal(idMedia: number, idProducto: number): Promise<{
        id: number;
        nombreArchivo: string;
        url: string | null;
        tipo: string;
        tamaño: number;
        mimeType: string;
        esPrincipal: boolean;
        createdAt: Date;
    }>;
    deleteMedia(idMedia: number, idProducto: number): Promise<{
        message: string;
    }>;
    deleteAllMediaProducto(idProducto: number): Promise<{
        message: string;
    }>;
    private mapMedia;
}
