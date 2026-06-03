import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  Min,
  ValidateNested,
} from 'class-validator';

export class VentaItemDto {
  @IsInt()
  idProducto: number;

  @IsInt()
  @Min(1)
  cantidad: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  descuento?: number;
}

export class CreateVentaDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => VentaItemDto)
  items: VentaItemDto[];

  @IsOptional()
  @IsInt()
  idMetodo?: number;

  @IsOptional()
  @IsInt()
  idCliente?: number;

  @IsOptional()
  tipoComprobante?: string;

  @IsOptional()
  numeroComprobante?: string;
}
