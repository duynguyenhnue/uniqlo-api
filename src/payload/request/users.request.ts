import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsDateString,
  Length,
} from 'class-validator';

class Address {
  @IsString()
  @IsNotEmpty()
  province: string;

  @IsString()
  @IsNotEmpty()
  district: string;

  @IsString()
  @IsNotEmpty()
  ward: string;
}

class Phone {
  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  number: string;
}

export class CreateUserRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 32)
  password: string;

  @IsDateString()
  @IsOptional()
  dateOfBirth: string | null;

  @IsNotEmpty()
  address: Address;

  @IsNotEmpty()
  phone: Phone;
}

export class UpdateUserRequest {
  @IsString()
  @IsOptional()
  avatar?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  fullName?: string;

  @IsString()
  @IsOptional()
  @Length(8, 32)
  password?: string;

  @IsDateString()
  @IsOptional()
  dateOfBirth?: string | null;

  @IsOptional()
  address?: Address;

  @IsOptional()
  phone?: Phone;

  @IsString()
  @IsOptional()
  status?: string;
}