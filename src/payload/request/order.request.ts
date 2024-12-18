import { IsArray, IsNotEmpty, IsNumber, IsString, IsObject, IsOptional, IsMongoId, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderItemRequest{
    @IsMongoId()
    @IsNotEmpty()
    productId:string;

    @IsNumber()
  @IsNotEmpty()
  count: number;

  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

}

export class CreateOrderRequest{

    // @IsMongoId()
    // @IsNotEmpty()
    // userId: string;

    @IsArray()
  @IsNotEmpty()
  @Type(() => CreateOrderItemRequest)
  orderItems: CreateOrderItemRequest[];

  @IsOptional()
  @IsMongoId()
  discountId?: string;

//   @IsOptional()
//   @IsNumber()
//   discountAmount?: number;

//   @IsNumber()
//   totalAmount?: number;

//   @IsNumber()
//   finalAmount?: number;

//   @IsString()
//   status?: string;
}

export class UpdateOrderRequest{

    // @IsMongoId()
    // @IsNotEmpty()
    // userId: string;

    @IsArray()
  @IsNotEmpty()
  @Type(() => CreateOrderItemRequest)
  orderItems?: CreateOrderItemRequest[];

  @IsOptional()
  @IsMongoId()
  discountId?: string;

//   @IsOptional()
//   @IsNumber()
//   discountAmount?: number;

//   @IsNumber()
//   @IsNotEmpty()
//   totalAmount: number;

//   @IsNumber()
//   @IsNotEmpty()
//   finalAmount: number;

//   @IsString()
//   @IsNotEmpty()
//   status: string;
}
export class SearchOrderbyIdRequest{
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
    orderId?: string;
  
    
  }