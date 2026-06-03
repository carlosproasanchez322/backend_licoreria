"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const media_service_1 = require("./media.service");
let MediaController = class MediaController {
    mediaService;
    constructor(mediaService) {
        this.mediaService = mediaService;
    }
    async uploadMedia(idProducto, file, principal) {
        if (!file) {
            throw new common_1.BadRequestException('No se proporcionó archivo');
        }
        const esPrincipal = principal === 'true';
        return this.mediaService.uploadMedia(+idProducto, file, esPrincipal);
    }
    async getMediaPrincipal(idProducto) {
        return this.mediaService.getMediaPrincipal(+idProducto);
    }
    async getMediaProducto(idProducto) {
        return this.mediaService.getMediaProducto(+idProducto);
    }
    async deleteAllMediaProducto(idProducto) {
        return this.mediaService.deleteAllMediaProducto(+idProducto);
    }
    async setMediaPrincipal(idMedia, idProducto) {
        return this.mediaService.setMediaPrincipal(+idMedia, +idProducto);
    }
    async deleteMedia(idMedia, idProducto) {
        return this.mediaService.deleteMedia(+idMedia, +idProducto);
    }
};
exports.MediaController = MediaController;
__decorate([
    (0, common_1.Post)('productos/:idProducto/upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('idProducto')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Query)('principal')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "uploadMedia", null);
__decorate([
    (0, common_1.Get)('productos/:idProducto/principal'),
    __param(0, (0, common_1.Param)('idProducto')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "getMediaPrincipal", null);
__decorate([
    (0, common_1.Get)('productos/:idProducto'),
    __param(0, (0, common_1.Param)('idProducto')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "getMediaProducto", null);
__decorate([
    (0, common_1.Delete)('productos/:idProducto/all'),
    __param(0, (0, common_1.Param)('idProducto')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "deleteAllMediaProducto", null);
__decorate([
    (0, common_1.Post)(':idMedia/principal'),
    __param(0, (0, common_1.Param)('idMedia')),
    __param(1, (0, common_1.Query)('idProducto')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "setMediaPrincipal", null);
__decorate([
    (0, common_1.Delete)(':idMedia'),
    __param(0, (0, common_1.Param)('idMedia')),
    __param(1, (0, common_1.Query)('idProducto')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "deleteMedia", null);
exports.MediaController = MediaController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('media'),
    __metadata("design:paramtypes", [media_service_1.MediaService])
], MediaController);
//# sourceMappingURL=media.controller.js.map