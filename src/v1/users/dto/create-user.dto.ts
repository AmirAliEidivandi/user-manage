import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsDate()
  @IsNotEmpty()
  birthDate: Date;

  @IsString()
  @IsNotEmpty()
  nationalCode: string;

  @IsString()
  @IsNotEmpty()
  requestId: string;
}
