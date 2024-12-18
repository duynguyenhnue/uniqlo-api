import { Type } from "class-transformer";
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsPhoneNumber, IsPositive, IsString, Min } from "class-validator";


export class CreateCommemtRequest{
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    phone: string;
  
    @IsNotEmpty()
    @IsString()
    comment: string;
}

export class UpdateCommentRequest{
    @IsNotEmpty()
    @IsString()
    name?: string;
  
    @IsNotEmpty()
    @IsEmail()
    email?: string;
  
    @IsNotEmpty()
    @IsString()
    phone?: string;
  
    @IsNotEmpty()
    @IsString()
    comment?: string;
}

export class CreateBlogdetailRequest{
    @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  author: string;
    
}
export class UpdateBlogdetailRequest{
    @IsNotEmpty()
  @IsString()
  title?: string;

  @IsNotEmpty()
  @IsString()
  image?: string;

  @IsNotEmpty()
  @IsString()
  content?: string;

  @IsNotEmpty()
  @IsString()
  author?: string; 
}
export class SearchBlogdetailRequest{
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

  @IsOptional()
  @IsString()
  title?: string;
}
