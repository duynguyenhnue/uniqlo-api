import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  Length,
} from "class-validator";

export class CreateUserRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 32)
  password: string;

  @IsString()
  role: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsUrl()
  @IsNotEmpty()
  avatar: string;

  @IsUrl()
  @IsNotEmpty()
  photoCover: string;

  @IsString()
  @IsNotEmpty()
  bio: string;
}

export class UpdateUserRequest {
  @IsString()
  @IsOptional()
  @Length(8, 32)
  password?: string;

  @IsString()
  @IsOptional()
  fullName?: string;

  @IsUrl()
  @IsOptional()
  avatar?: string;

  @IsUrl()
  @IsOptional()
  photoCover?: string;

  @IsString()
  @IsOptional()
  bio?: string;
}
