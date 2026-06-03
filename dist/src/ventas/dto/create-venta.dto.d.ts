export declare class VentaItemDto {
    idProducto: number;
    cantidad: number;
    descuento?: number;
}
export declare class CreateVentaDto {
    items: VentaItemDto[];
    idMetodo?: number;
    idCliente?: number;
    tipoComprobante?: string;
    numeroComprobante?: string;
}
