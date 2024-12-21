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
  Req,
} from "@nestjs/common";
import { ProductService } from "./products.service";
import {
  fitlerProduct,
  ProductCreateRequest,
  ProductSearchRequest,
  ProductUpdateRequest,
} from "../../payload/request/product.request";
import { ProductResponse } from "../../payload/response/product.respone";
import { IResponse } from "../../common/interface/response.interface";
import { successResponse } from "../../common/dto/response.dto";
import { AuthJwtAccessProtected } from "../../common/guards/role.guard";
import { AUTH_PERMISSIONS } from "../../enums/auth.enum";
import { SkipAuth } from "../../config/skip.auth";

@Controller("products")
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Post()
  // @AuthJwtAccessProtected(AUTH_PERMISSIONS.PRODUCT_CREATE)
  async create(
    @Body() productcreaterequest: ProductCreateRequest,
    @Req() req
  ): Promise<IResponse<ProductResponse>> {
    try {
      const product = await this.service.create(
        productcreaterequest,
        req.user.id
      );
      return successResponse(product);
    } catch (error) {
      throw new NotFoundException(
        `Error while create product:${error.message}`
      );
    }
  }

  @Get("search")
  // @AuthJwtAccessProtected(AUTH_PERMISSIONS.PRODUCT_VIEW)
  @SkipAuth()
  async search(@Query() query: ProductSearchRequest) {
    try {
      return this.service.searchproduct(query);
    } catch (error) {
      throw new Error(`Error while search product`);
    }
  }
  @Get("favorite")
  @AuthJwtAccessProtected(AUTH_PERMISSIONS.PRODUCT_VIEW)
  async getFavorite(@Req() req): Promise<ProductResponse[]> {
    try {
      return this.service.getFavorite(req.user.id);
    } catch (error) {
      throw new Error(`Error while get favorite product`);
    }
  }
  @Get("filter")
  @AuthJwtAccessProtected(AUTH_PERMISSIONS.PRODUCT_VIEW)
  async filter(@Query() query: fitlerProduct) {
    try {
      // const processedQuery = {
      //   ...query,
      //   limit: query.limit ? Number(query.limit) : 6,
      //   page: query.page ? Number(query.page) : 0,
      //   minPrice: query.minPrice ? Number(query.minPrice) : undefined,
      //   maxPrice: query.maxPrice ? Number(query.maxPrice) : undefined
      // };

      // console.log('Processed Query:', processedQuery);

      // Object.keys(query).forEach(key => {
      //   console.log(`${key} type: ${typeof query[key]}`);
      // });

      return this.service.filterProduct(query);
    } catch (error) {
      throw new NotFoundException(`Error while filter product`, error);
    }
  }

  @Get()
  @SkipAuth()
  // @AuthJwtAccessProtected(AUTH_PERMISSIONS.PRODUCT_VIEW)
  async findAll(): Promise<ProductResponse[]> {
    try {
      return this.service.findAll();
    } catch (error) {
      throw new Error(` Eror while find all product `);
    }
  }
  @Get(":id")
  // @AuthJwtAccessProtected(AUTH_PERMISSIONS.PRODUCT_VIEW)
  @SkipAuth()
  async findOne(@Param("id") id: string): Promise<ProductResponse> {
    try {
      return this.service.getSingleProduct(id);
    } catch (error) {
      throw new Error(`Error while find  product by id`);
    }
  }

  @Delete(":id")
  // @AuthJwtAccessProtected(AUTH_PERMISSIONS.PRODUCT_DELETE)
  async delete(@Param("id") id: string): Promise<{ message: string }> {
    try {
      await this.service.delete(id);
      return { message: `Delete Successfully` };
    } catch (error) {
      throw new Error(`Error while delete product`);
    }
  }

  @Put("favorite/:type/:id")
  // @AuthJwtAccessProtected(AUTH_PERMISSIONS.PRODUCT_VIEW)
  async favorite(
    @Param("type") type: string,
    @Param("id") id: string,
    @Req() req
  ): Promise<ProductResponse> {
    try {
      return this.service.updateFavorite(type, id, req.user.id);
    } catch (error) {
      throw new Error(`Error while find  product by id`);
    }
  }

  @Put(":id")
  // @AuthJwtAccessProtected(AUTH_PERMISSIONS.PRODUCT_UPDATE)
  async update(
    @Param("id") id: string,
    @Body() productUpdateRequest: ProductUpdateRequest
  ): Promise<ProductResponse> {
    try {
      return this.service.update(id, productUpdateRequest);
    } catch (error) {
      throw new Error(`Error while update product`);
    }
  }
}
