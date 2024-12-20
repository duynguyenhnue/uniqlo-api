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
import {
  fitlerProduct,
  ProductCreateRequest,
  ProductSearchRequest,
  ProductUpdateRequest,
} from "src/payload/request/product.request";
import { ProductResponse } from "src/payload/response/product.respone";
import { IResponse } from "src/common/interface/response.interface";
import { successResponse } from "src/common/dto/response.dto";
import { AuthJwtAccessProtected } from "src/common/guards/role.guard";
import { AUTH_PERMISSIONS } from "src/enums/auth.enum";
import { query } from "express";
import { FavoutiesService } from "./favourites.service";
import { FavoriteResponseDto } from "src/payload/response/favourites.respone";
import { SkipAuth } from "src/config/skip.auth";
@Controller("favourites")
export class FavoutiesController {
  constructor(private readonly service: FavoutiesService) {}

  @Post("toggle/:product_Id")
  // @AuthJwtAccessProtected(AUTH_PERMISSIONS.FAVOURITES_CREATE)
  async toggleFavorite(
    @Req() req: any,
    @Param("product_Id") product_Id: string
  ): Promise<FavoriteResponseDto> {
    try {
      const userId = req.user._id;
      return this.service.ProductFavorite(userId, product_Id);
    } catch (error) {
      throw new NotFoundException(
        `Error while create favourites:${error.message}`
      );
    }
  }

  @Get()
  //  @AuthJwtAccessProtected(AUTH_PERMISSIONS.FAVOURITES_VIEW)
  async getlist(
    @Req() req: any
  ): Promise<{ products: ProductResponse[]; total: number }> {
    try {
      const user_Id = req.user._id;

      return this.service.getlistfavouriteProduct(user_Id, req.query);
    } catch (error) {
      throw new Error(`Error while search product,${error.message}`);
    }
  }
}
