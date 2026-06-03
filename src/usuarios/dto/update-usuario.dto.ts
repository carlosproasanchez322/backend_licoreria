import {
  IsString,
  IsInt,
  IsBoolean,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
} from 'class-validator';

export class UpdateUsuarioDto {
  @IsOptional()
  @IsString({ message: 'Los nombres deben ser texto' })
  @MinLength(3, { message: 'Los nombres deben tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'Los nombres no pueden exceder 100 caracteres' })
  nombres?: string;

  @IsOptional()
  @IsString({ message: 'Los apellidos deben ser texto' })
  @MinLength(3, { message: 'Los apellidos deben tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'Los apellidos no pueden exceder 100 caracteres' })
  apellidos?: string;

  @IsOptional()
  @IsString({ message: 'El usuario debe ser texto' })
  @MinLength(3, { message: 'El usuario debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'El usuario no puede exceder 50 caracteres' })
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message: 'El usuario solo puede contener letras, números, guiones y guiones bajos',
  })
  usuario?: string;

  @IsOptional()
  @IsString({ message: 'La contraseña debe ser texto' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password?: string;

  @IsOptional()
  @IsInt({ message: 'El rol debe ser un número' })
  idRol?: number;

  @IsOptional()
  @IsBoolean({ message: 'El estado debe ser un booleano' })
  estado?: boolean;
}
