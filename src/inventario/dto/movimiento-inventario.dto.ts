import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class MovimientoInventarioDto {
  @IsInt()
  idProducto: number;

  @IsString()
  @IsNotEmpty()
  tipoMovimiento: string;

  @IsInt()
  @Min(1)
  cantidad: number;

  @IsOptional()
  @IsString()
  motivo?: string;
}
