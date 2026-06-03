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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsuarioDto = void 0;
const class_validator_1 = require("class-validator");
class CreateUsuarioDto {
    nombres;
    apellidos;
    usuario;
    password;
    idRol;
    estado;
}
exports.CreateUsuarioDto = CreateUsuarioDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Los nombres deben ser texto' }),
    (0, class_validator_1.MinLength)(3, { message: 'Los nombres deben tener al menos 3 caracteres' }),
    (0, class_validator_1.MaxLength)(100, { message: 'Los nombres no pueden exceder 100 caracteres' }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "nombres", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Los apellidos deben ser texto' }),
    (0, class_validator_1.MinLength)(3, { message: 'Los apellidos deben tener al menos 3 caracteres' }),
    (0, class_validator_1.MaxLength)(100, { message: 'Los apellidos no pueden exceder 100 caracteres' }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "apellidos", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'El usuario debe ser texto' }),
    (0, class_validator_1.MinLength)(3, { message: 'El usuario debe tener al menos 3 caracteres' }),
    (0, class_validator_1.MaxLength)(50, { message: 'El usuario no puede exceder 50 caracteres' }),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9_-]+$/, {
        message: 'El usuario solo puede contener letras, números, guiones y guiones bajos',
    }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "usuario", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'La contraseña debe ser texto' }),
    (0, class_validator_1.MinLength)(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: 'El rol debe ser un número' }),
    __metadata("design:type", Number)
], CreateUsuarioDto.prototype, "idRol", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({ message: 'El estado debe ser un booleano' }),
    __metadata("design:type", Boolean)
], CreateUsuarioDto.prototype, "estado", void 0);
//# sourceMappingURL=create-usuario.dto.js.map