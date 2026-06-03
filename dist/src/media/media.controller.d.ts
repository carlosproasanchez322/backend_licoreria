import { MediaService } from './media.service';
export declare class MediaController {
    private readonly mediaService;
    constructor(mediaService: MediaService);
    uploadMedia(idProducto: string, file: Express.Multer.File, principal?: string): Promise<{
        id: number;
        nombreArchivo: string;
        url: string | null;
        tipo: string;
        tamaño: number;
        mimeType: string;
        esPrincipal: boolean;
        createdAt: Date;
    }>;
    getMediaPrincipal(idProducto: string): Promise<{
        id: number;
        nombreArchivo: string;
        url: string | null;
        tipo: string;
        tamaño: number;
        mimeType: string;
        esPrincipal: boolean;
        createdAt: Date;
    } | null>;
    getMediaProducto(idProducto: string): Promise<{
        id: number;
        nombreArchivo: string;
        url: string | null;
        tipo: string;
        tamaño: number;
        mimeType: string;
        esPrincipal: boolean;
        createdAt: Date;
    }[]>;
    deleteAllMediaProducto(idProducto: string): Promise<{
        message: string;
    }>;
    setMediaPrincipal(idMedia: string, idProducto: string): Promise<{
        id: number;
        nombreArchivo: string;
        url: string | null;
        tipo: string;
        tamaño: number;
        mimeType: string;
        esPrincipal: boolean;
        createdAt: Date;
    }>;
    deleteMedia(idMedia: string, idProducto: string): Promise<{
        message: string;
    }>;
}
