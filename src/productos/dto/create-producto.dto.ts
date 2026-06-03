import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  precioCompra: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  precioVenta: number;

  @IsInt()
  @Min(0)
  stock: number;

  @IsOptional()
  @IsString()
  codigoBarra?: string;

  @IsInt()
  @Min(1)
  idCategoria: number;

  @IsInt()
  @Min(1)
  idUnidad: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  idMarca?: number;
}
