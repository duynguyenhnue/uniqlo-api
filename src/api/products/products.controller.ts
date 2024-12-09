import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  Put,
  Delete,
  Query,
  NotFoundException,
} from "@nestjs/common";
import { ProductService } from "./products.service";
import {
  ProductCreateRequest,
  ProductSearchRequest,
  ProductUpdateRequest,
} from "src/payload/request/product.request";
import { ProductResponse } from "src/payload/response/product.respone";
import { IResponse } from "src/common/interface/response.interface";
import { successResponse } from "src/common/dto/response.dto";
import { SkipAuth } from "src/config/skip.auth";
@Controller("products")
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Post()
  @SkipAuth()
  async create(
    @Body() productcreaterequest: ProductCreateRequest
  ): Promise<IResponse<ProductResponse>> {
    const product = await this.service.create(productcreaterequest);
    return successResponse(product);
  }

  @SkipAuth()
  @Get("search")
  async search(@Query() query: ProductSearchRequest) {
    return this.service.searchproduct(query);
  }
  @SkipAuth()
  @Get()
  async findAll(): Promise<ProductResponse[]> {
    return this.service.findAll();
  }

  @SkipAuth()
  @Get(":id")
  async findOne(@Param("id") id: string): Promise<ProductResponse> {
    return this.service.findOne(id);
  }
  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() productUpdateRequest: ProductUpdateRequest
  ): Promise<ProductResponse> {
    return this.service.update(id, productUpdateRequest);
  }
  @Delete(":id")
  @SkipAuth()
  async delete(@Param("id") id: string): Promise<{ message: string }> {
    await this.service.delete(id);
    return { message: `Delete Successfully` };
  }
}
