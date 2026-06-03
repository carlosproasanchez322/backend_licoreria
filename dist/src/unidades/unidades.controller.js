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
exports.UnidadesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const create_unidad_dto_1 = require("./dto/create-unidad.dto");
const update_unidad_dto_1 = require("./dto/update-unidad.dto");
const unidades_service_1 = require("./unidades.service");
let UnidadesController = class UnidadesController {
    unidadesService;
    constructor(unidadesService) {
        this.unidadesService = unidadesService;
    }
    create(body) {
        return this.unidadesService.create(body);
    }
    findAll() {
        return this.unidadesService.findAll();
    }
    findOne(id) {
        return this.unidadesService.findOne(+id);
    }
    update(id, body) {
        return this.unidadesService.update(+id, body);
    }
    remove(id) {
        return this.unidadesService.remove(+id);
    }
};
exports.UnidadesController = UnidadesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_unidad_dto_1.CreateUnidadDto]),
    __metadata("design:returntype", void 0)
], UnidadesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UnidadesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UnidadesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_unidad_dto_1.UpdateUnidadDto]),
    __metadata("design:returntype", void 0)
], UnidadesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UnidadesController.prototype, "remove", null);
exports.UnidadesController = UnidadesController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('unidades'),
    __metadata("design:paramtypes", [unidades_service_1.UnidadesService])
], UnidadesController);
//# sourceMappingURL=unidades.controller.js.map