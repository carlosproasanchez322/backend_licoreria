"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let MediaService = class MediaService {
    prisma;
    uploadDir = path.join(process.cwd(), 'uploads', 'productos');
    constructor(prisma) {
        this.prisma = prisma;
        this.ensureUploadDir();
    }
    ensureUploadDir() {
        if (!fs.existsSync(this.uploadDir)) {
            fs.mkdirSync(this.uploadDir, { recursive: true });
        }
    }
    async uploadMedia(idProducto, file, esPrincipal = false) {
        const producto = await this.prisma.producto.findUnique({
            where: { idProducto },
        });
        if (!producto) {
            throw new common_1.NotFoundException('Producto no encontrado');
        }
        const tiposPermitidos = [
            'image/jpeg',
            'image/png',
            'image/webp',
            'video/mp4',
            'video/webm',
        ];
        if (!tiposPermitidos.includes(file.mimetype)) {
            throw new common_1.BadRequestException('Tipo de archivo no permitido. Solo se permiten: JPG, PNG, WebP, MP4, WebM');
        }
        const maxSize = 50 * 1024 * 1024;
        if (file.size > maxSize) {
            throw new common_1.BadRequestException('El archivo es demasiado grande (máximo 50MB)');
        }
        const tipo = file.mimetype.startsWith('image') ? 'foto' : 'video';
        const timestamp = Date.now();
        const nombreArchivo = `${idProducto}_${timestamp}_${file.originalname}`;
        const rutaCompleta = path.join(this.uploadDir, nombreArchivo);
        fs.writeFileSync(rutaCompleta, file.buffer);
        if (esPrincipal) {
            await this.prisma.mediaProducto.updateMany({
                where: { idProducto },
                data: { esPrincipal: false },
            });
        }
        const media = await this.prisma.mediaProducto.create({
            data: {
                idProducto,
                tipo,
                nombreArchivo,
                ruta: rutaCompleta,
                urlPublica: `/uploads/productos/${nombreArchivo}`,
                tamano: file.size,
                mimeType: file.mimetype,
                esPrincipal,
            },
        });
        return this.mapMedia(media);
    }
    async getMediaProducto(idProducto) {
        const media = await this.prisma.mediaProducto.findMany({
            where: { idProducto },
            orderBy: [{ esPrincipal: 'desc' }, { createdAt: 'desc' }],
        });
        return media.map((m) => this.mapMedia(m));
    }
    async getMediaPrincipal(idProducto) {
        const media = await this.prisma.mediaProducto.findFirst({
            where: { idProducto, esPrincipal: true },
        });
        if (!media) {
            return null;
        }
        return this.mapMedia(media);
    }
    async setMediaPrincipal(idMedia, idProducto) {
        const media = await this.prisma.mediaProducto.findUnique({
            where: { idMedia },
        });
        if (!media || media.idProducto !== idProducto) {
            throw new common_1.NotFoundException('Media no encontrada');
        }
        await this.prisma.mediaProducto.updateMany({
            where: { idProducto },
            data: { esPrincipal: false },
        });
        const updated = await this.prisma.mediaProducto.update({
            where: { idMedia },
            data: { esPrincipal: true },
        });
        return this.mapMedia(updated);
    }
    async deleteMedia(idMedia, idProducto) {
        const media = await this.prisma.mediaProducto.findUnique({
            where: { idMedia },
        });
        if (!media || media.idProducto !== idProducto) {
            throw new common_1.NotFoundException('Media no encontrada');
        }
        if (fs.existsSync(media.ruta)) {
            fs.unlinkSync(media.ruta);
        }
        await this.prisma.mediaProducto.delete({
            where: { idMedia },
        });
        return { message: 'Media eliminada correctamente' };
    }
    async deleteAllMediaProducto(idProducto) {
        const mediaList = await this.prisma.mediaProducto.findMany({
            where: { idProducto },
        });
        for (const media of mediaList) {
            if (fs.existsSync(media.ruta)) {
                fs.unlinkSync(media.ruta);
            }
        }
        await this.prisma.mediaProducto.deleteMany({
            where: { idProducto },
        });
        return { message: 'Todos los archivos eliminados' };
    }
    mapMedia(media) {
        return {
            id: media.idMedia,
            nombreArchivo: media.nombreArchivo,
            url: media.urlPublica,
            tipo: media.tipo,
            tamaño: media.tamano,
            mimeType: media.mimeType,
            esPrincipal: media.esPrincipal,
            createdAt: media.createdAt,
        };
    }
};
exports.MediaService = MediaService;
exports.MediaService = MediaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MediaService);
//# sourceMappingURL=media.service.js.map