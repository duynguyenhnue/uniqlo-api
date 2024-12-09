import { Type } from "class-transformer";
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsDateString,
  Length,
  ValidateNested,
  IsInt,
  IsPositive,
  IsNumber,
} from "class-validator";

export class Address {
  @IsString({ message: "homenumber phải là dạng chuỗi" })
  @IsNotEmpty({ message: "homenumber không được để trống" })
  homenumber: string;

  @IsString({ message: "street phải là dạng chuỗi" })
  @IsNotEmpty({ message: "street không được để trống" })
  street: string;

  @IsString({ message: "city phải là dạng chuỗi" })
  @IsNotEmpty({ message: "city không được để trống" })
  city: string;

  @IsString({ message: "country phải là dạng chuỗi" })
  @IsNotEmpty({ message: "country không được để trống" })
  country: string;
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

  @IsNotEmpty({ message: "Địa chỉ không được để trống" })
  @IsString({ message: "địa chỉ phải là dạng chuỗi" }) 
  address: string;

  @IsNotEmpty({ message: "Số điện thoại không được để trống" })
  @IsString({ message: "phone phải là dạng chuỗi" }) 
  phone: string;
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
  birthday?: string | null;

  @IsOptional()
  address?: Address;

  @IsOptional()
  phone?: string;

  @IsString({ message: "status phải là dạng chuỗi" })
  @IsOptional()
  status?: string;
}

export class SearchUserRequest {
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @IsString({ message: "fullname phải là dạng chuỗi" })
  @IsOptional()
  fullName?: string;

  @IsString({ message: "email phải là dạng chuỗi" })
  @IsOptional()
  email?: string;
}
