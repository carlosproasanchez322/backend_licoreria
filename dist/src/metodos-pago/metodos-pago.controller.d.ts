import { MetodosPagoService } from './metodos-pago.service';
export declare class MetodosPagoController {
    private readonly metodosPagoService;
    constructor(metodosPagoService: MetodosPagoService);
    findAll(): Promise<{
        idMetodo: number;
        nombre: string;
    }[]>;
    findOne(id: number): Promise<{
        idMetodo: number;
        nombre: string;
    } | null>;
}
