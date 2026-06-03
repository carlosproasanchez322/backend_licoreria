import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(data: RegisterDto): Promise<{
        nombres: string;
        apellidos: string;
        usuario: string;
        estado: boolean;
        rol: {
            idRol: number;
            nombre: string;
        };
        idUsuario: number;
        idRol: number;
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
        nombres: string;
        apellidos: string;
        usuario: string;
        estado: boolean;
        rol: {
            idRol: number;
            nombre: string;
        };
        idUsuario: number;
    }>;
}
