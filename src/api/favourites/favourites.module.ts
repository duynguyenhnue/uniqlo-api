import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "../../schema/product.schema";

import { RefreshTokenModule } from "../refresh-token/refresh-token.module";
import { AuthModule } from "../auth/auth.module";
import { PermissionModule } from "../permission/permission.module";
import { RoleModule } from "../roles/role.module";
import { FavoutiesService } from "./favourites.service";
import { FavoutiesController } from "./favourites.controller";
import {
  FavoriteProduct,
  FavoriteProductSchema,
} from "../../schema/favourites.schema";
import { UserModule } from "../users/users.module";
import { ProductModel } from "../products/products.module";
import { User, UserSchema } from "../../schema/user.schema";
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FavoriteProduct.name, schema: FavoriteProductSchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    forwardRef(() => RefreshTokenModule),
    forwardRef(() => AuthModule),
    forwardRef(() => PermissionModule),
    forwardRef(() => RoleModule),
    UserModule,
    ProductModel,
  ],
  providers: [FavoutiesService],
  controllers: [FavoutiesController],
})
export class FavouritesModel {}
