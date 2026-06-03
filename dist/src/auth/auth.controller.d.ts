import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
type AuthRequest = Request & {
    user: {
        idUsuario: number;
        usuario: string;
    };
};
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: RegisterDto): Promise<{
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
    login(body: LoginDto): Promise<{
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
    profile(req: AuthRequest): Promise<{
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
export {};
