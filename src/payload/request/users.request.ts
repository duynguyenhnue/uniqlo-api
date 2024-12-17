import { Type } from "class-transformer";
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  Length,
  ValidateNested,
  IsInt,
  IsPositive,
  Min,
  IsArray,
  IsMongoId,
} from "class-validator";

export class Address {
  @IsString({ message: "ward phải là dạng chuỗi" })
  @IsNotEmpty({ message: "ward không được để trống" })
  ward: string;

  @IsString({ message: "district phải là dạng chuỗi" })
  @IsNotEmpty({ message: "district không được để trống" })
  district: string;

  @IsString({ message: "province phải là dạng chuỗi" })
  @IsNotEmpty({ message: "province không được để trống" })
  province: string;
}

export class Phone {
  @IsString({ message: "country phải là dạng chuỗi" })
  @IsNotEmpty({ message: "country không được để trống" })
  country: string;

  @IsString({ message: "number phải là dạng chuỗi" })
  @IsNotEmpty({ message: "number không được để trống" })
  number: string;
}

export class CreateUserRequest {
  @IsEmail()
  @IsNotEmpty({ message: "email không được để trống" })
  email: string;

  @IsString({ message: "fullname phải là dạng chuỗi" })
  @IsNotEmpty({ message: "full name không được để trống" })
  fullName: string;

  @IsString({ message: "mật khẩu phải là dạng chuỗi" })
  @IsNotEmpty({ message: "mật khẩu không được để trống" })
  @Length(8, 32)
  password: string;

  @IsDateString()
  @IsOptional()
  birthdate: string | null;

  @IsNotEmpty({ message: "Địa chỉ không được để trống" })
  @ValidateNested({ each: true })
  @Type(() => Address)
  address: Address;

  @IsNotEmpty({ message: "Số điện thoại không được để trống" })
  @ValidateNested({ each: true })
  @Type(() => Phone)
  phone: Phone;

  @IsString()
  @IsOptional()
  avatar?: string;
}

export class UpdateUserRequest {
  @IsString()
  @IsOptional()
  avatar?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString({ message: "fullname phải là dạng chuỗi" })
  @IsOptional()
  fullName?: string;

  @IsString({ message: "password phải là dạng chuỗi" })
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

  @IsString()
  @IsOptional()
  gender?: string;

  @IsArray()
  @IsString({ each: true })
  product_Id?: string[];

  @IsString()
  @IsOptional()
  advice?: string;

  @IsString()
  @IsOptional()
  role?: string;

  @IsOptional()
  deliveryAddress?: Address[];
}

export class SearchUserRequest {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number;

  @IsString({ message: "fullname phải là dạng chuỗi" })
  @IsOptional()
  fullName?: string;

  @IsString({ message: "email phải là dạng chuỗi" })
  @IsOptional()
  email?: string;
}


export class ChangePasswordRequest {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}