import { IsString, IsNotEmpty, IsEmail, IsMongoId, MinLength } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsMongoId()
  @IsNotEmpty()
  user: string; // The ID of the user document
}

