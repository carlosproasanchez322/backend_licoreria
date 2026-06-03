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
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
let UsuariosService = class UsuariosService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    selectFields = {
        idUsuario: true,
        nombres: true,
        apellidos: true,
        usuario: true,
        estado: true,
        idRol: true,
        rol: { select: { idRol: true, nombre: true } },
    };
    async create(createUsuarioDto) {
        const usuarioExistente = await this.prisma.usuario.findUnique({
            where: { usuario: createUsuarioDto.usuario },
        });
        if (usuarioExistente) {
            throw new common_1.ConflictException('El usuario ya existe');
        }
        const rolExistente = await this.prisma.rol.findUnique({
            where: { idRol: createUsuarioDto.idRol },
        });
        if (!rolExistente) {
            throw new common_1.BadRequestException('El rol especificado no existe');
        }
        const passwordHash = await bcrypt.hash(createUsuarioDto.password, 10);
        try {
            return await this.prisma.usuario.create({
                data: {
                    nombres: createUsuarioDto.nombres,
                    apellidos: createUsuarioDto.apellidos,
                    usuario: createUsuarioDto.usuario,
                    passwordHash,
                    idRol: createUsuarioDto.idRol,
                    estado: createUsuarioDto.estado ?? true,
                },
                select: this.selectFields,
            });
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.ConflictException('El usuario ya existe');
            }
            throw error;
        }
    }
    async findAll() {
        return this.prisma.usuario.findMany({
            select: this.selectFields,
            orderBy: { idUsuario: 'desc' },
        });
    }
    async findOne(id) {
        const usuario = await this.prisma.usuario.findUnique({
            where: { idUsuario: id },
            select: this.selectFields,
        });
        if (!usuario) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        return usuario;
    }
    async update(id, updateUsuarioDto) {
        const usuario = await this.prisma.usuario.findUnique({
            where: { idUsuario: id },
        });
        if (!usuario) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        if (updateUsuarioDto.usuario &&
            updateUsuarioDto.usuario !== usuario.usuario) {
            const usuarioExistente = await this.prisma.usuario.findUnique({
                where: { usuario: updateUsuarioDto.usuario },
            });
            if (usuarioExistente) {
                throw new common_1.ConflictException('El usuario ya existe');
            }
        }
        if (updateUsuarioDto.idRol) {
            const rolExistente = await this.prisma.rol.findUnique({
                where: { idRol: updateUsuarioDto.idRol },
            });
            if (!rolExistente) {
                throw new common_1.BadRequestException('El rol especificado no existe');
            }
        }
        const dataToUpdate = {
            nombres: updateUsuarioDto.nombres,
            apellidos: updateUsuarioDto.apellidos,
            usuario: updateUsuarioDto.usuario,
            idRol: updateUsuarioDto.idRol,
            estado: updateUsuarioDto.estado,
        };
        if (updateUsuarioDto.password) {
            dataToUpdate.passwordHash = await bcrypt.hash(updateUsuarioDto.password, 10);
        }
        Object.keys(dataToUpdate).forEach((key) => dataToUpdate[key] === undefined && delete dataToUpdate[key]);
        try {
            return await this.prisma.usuario.update({
                where: { idUsuario: id },
                data: dataToUpdate,
                select: this.selectFields,
            });
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.ConflictException('El usuario ya existe');
            }
            throw error;
        }
    }
    async remove(id) {
        const usuario = await this.prisma.usuario.findUnique({
            where: { idUsuario: id },
        });
        if (!usuario) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        try {
            return await this.prisma.usuario.delete({
                where: { idUsuario: id },
                select: this.selectFields,
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException('Usuario no encontrado');
            }
            throw error;
        }
    }
    async getRoles() {
        return this.prisma.rol.findMany({
            select: { idRol: true, nombre: true },
            orderBy: { nombre: 'asc' },
        });
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map