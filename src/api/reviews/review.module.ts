import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ReviewService } from "./review.service";
import { ReviewController } from "./review.controller";
import { Review, ReviewSchema } from "../../schema/reviews.schema";
import { RefreshTokenModule } from "../refresh-token/refresh-token.module";
import { AuthModule } from "../auth/auth.module";
import { PermissionModule } from "../permission/permission.module";
import { RoleModule } from "../roles/role.module";
import { UserModule } from "../users/users.module";
import { ProductModel } from "../products/products.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
    forwardRef(() => RefreshTokenModule),
    forwardRef(() => AuthModule),
    forwardRef(() => ProductModel),
    forwardRef(() => PermissionModule),
    forwardRef(() => RoleModule),
    UserModule,
  ],
  providers: [ReviewService],
  controllers: [ReviewController],
  exports: [ReviewService, MongooseModule],
})
export class ReviewModule {}
