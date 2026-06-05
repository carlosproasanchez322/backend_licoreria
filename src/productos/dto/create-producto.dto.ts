import { Transform } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  precioCompra: number;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  precioVenta: number;

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(0)
  stock: number;

  @IsOptional()
  @IsString()
  codigoBarra?: string;

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  idCategoria: number;

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  idUnidad: number;

  @IsOptional()
  @Transform(({ value }) => (value ? parseInt(value) : undefined))
  @IsInt()
  @Min(1)
  idMarca?: number;
}
