import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "../../schema/product.schema";
import { ProductService } from "../products/products.service";
import { ProductController } from "../products/products.controller";
import { RefreshTokenModule } from "../refresh-token/refresh-token.module";
import { AuthModule } from "../auth/auth.module";
import { PermissionModule } from "../permission/permission.module";
import { RoleModule } from "../roles/role.module";
import { UserModule } from "../users/users.module";
import { User, UserSchema } from "../../schema/user.schema";
import { ReviewSchema } from "../../schema/reviews.schema";
import { Review } from "../../schema/reviews.schema";
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
    forwardRef(() => RefreshTokenModule),
    forwardRef(() => AuthModule),
    forwardRef(() => PermissionModule),
    forwardRef(() => RoleModule),
    UserModule,
  ],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService, MongooseModule],
})
export class ProductModel {}
