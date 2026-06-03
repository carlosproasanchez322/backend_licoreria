import { MovimientoInventarioDto } from './dto/movimiento-inventario.dto';
import { InventarioService } from './inventario.service';
export declare class InventarioController {
    private readonly inventarioService;
    constructor(inventarioService: InventarioService);
    kardex(idProducto?: string): import("@prisma/client").Prisma.PrismaPromise<({
        producto: {
            nombre: string;
            idProducto: number;
            codigoBarra: string | null;
        };
    } & {
        idProducto: number;
        fecha: Date;
        cantidad: number;
        tipoMovimiento: string;
        motivo: string | null;
        stockAnterior: number;
        stockNuevo: number;
        idMovimiento: number;
    })[]>;
    movimiento(dto: MovimientoInventarioDto): Promise<{
        producto: {
            nombre: string;
            idUnidad: number;
            idCategoria: number;
            descripcion: string | null;
            idMarca: number | null;
            idProducto: number;
            codigoBarra: string | null;
            precioCompra: import("@prisma/client-runtime-utils").Decimal;
            precioVenta: import("@prisma/client-runtime-utils").Decimal;
            stock: number;
            stockMinimo: number;
            tieneIgv: boolean;
            esLicor: boolean;
            gradoAlcohol: import("@prisma/client-runtime-utils").Decimal | null;
            fechaVencimiento: Date | null;
        };
    } & {
        idProducto: number;
        fecha: Date;
        cantidad: number;
        tipoMovimiento: string;
        motivo: string | null;
        stockAnterior: number;
        stockNuevo: number;
        idMovimiento: number;
    }>;
}
