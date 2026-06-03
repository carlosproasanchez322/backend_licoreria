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
exports.VentasController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const create_venta_dto_1 = require("./dto/create-venta.dto");
const ventas_service_1 = require("./ventas.service");
let VentasController = class VentasController {
    ventasService;
    constructor(ventasService) {
        this.ventasService = ventasService;
    }
    create(dto, req) {
        return this.ventasService.create(dto, req.user.idUsuario);
    }
    findAll() {
        return this.ventasService.findAll();
    }
    resumenDia() {
        return this.ventasService.resumenDia();
    }
    findOne(id) {
        return this.ventasService.findOne(id);
    }
    remove(id) {
        return this.ventasService.remove(id);
    }
};
exports.VentasController = VentasController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_venta_dto_1.CreateVentaDto, Object]),
    __metadata("design:returntype", void 0)
], VentasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VentasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('resumen/dia'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VentasController.prototype, "resumenDia", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VentasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VentasController.prototype, "remove", null);
exports.VentasController = VentasController = __decorate([
    (0, common_1.Controller)('ventas'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [ventas_service_1.VentasService])
], VentasController);
//# sourceMappingURL=ventas.controller.js.map