import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateProveedorDto {
  @IsString()
  @MinLength(2)
  razonSocial: string;

  @IsOptional()
  @IsString()
  ruc?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  direccion?: string;
}
