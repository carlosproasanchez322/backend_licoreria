import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(data: RegisterDto): Promise<{
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
    login(data: LoginDto): Promise<{
        access_token: string;
        usuario: {
            idUsuario: number;
            nombres: string;
            apellidos: string;
            usuario: string;
            estado: true;
            idRol: number;
            rol: {
                idRol: number;
                nombre: string;
            };
        };
    }>;
    getProfile(userId: number): Promise<{
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
}
