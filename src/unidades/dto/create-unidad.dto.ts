import { IsString, MinLength } from 'class-validator';

export class CreateUnidadDto {
  @IsString()
  @MinLength(2)
  nombre: string;

  @IsString()
  @MinLength(1)
  abreviatura: string;
}
