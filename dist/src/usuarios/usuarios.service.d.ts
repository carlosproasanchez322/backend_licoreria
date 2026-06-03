import { PrismaService } from '../prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
export declare class UsuariosService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private selectFields;
    create(createUsuarioDto: CreateUsuarioDto): Promise<{
        idRol: number;
        rol: {
            nombre: string;
            idRol: number;
        };
        idUsuario: number;
        usuario: string;
        nombres: string;
        apellidos: string;
        estado: boolean;
    }>;
    findAll(): Promise<{
        idRol: number;
        rol: {
            nombre: string;
            idRol: number;
        };
        idUsuario: number;
        usuario: string;
        nombres: string;
        apellidos: string;
        estado: boolean;
    }[]>;
    findOne(id: number): Promise<{
        idRol: number;
        rol: {
            nombre: string;
            idRol: number;
        };
        idUsuario: number;
        usuario: string;
        nombres: string;
        apellidos: string;
        estado: boolean;
    }>;
    update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<{
        idRol: number;
        rol: {
            nombre: string;
            idRol: number;
        };
        idUsuario: number;
        usuario: string;
        nombres: string;
        apellidos: string;
        estado: boolean;
    }>;
    remove(id: number): Promise<{
        idRol: number;
        rol: {
            nombre: string;
            idRol: number;
        };
        idUsuario: number;
        usuario: string;
        nombres: string;
        apellidos: string;
        estado: boolean;
    }>;
    getRoles(): Promise<{
        nombre: string;
        idRol: number;
    }[]>;
}
