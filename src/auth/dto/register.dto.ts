import { IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  nombres: string;

  @IsNotEmpty()
  apellidos: string;

  @IsNotEmpty()
  usuario: string;

  @MinLength(6)
  password: string;
}
