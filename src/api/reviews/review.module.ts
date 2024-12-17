import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ReviewService } from "./review.service";
import { ReviewController } from "./review.controller";
import { Review, ReviewSchema } from "src/schema/reviews.schema";
import { RefreshTokenModule } from "../refresh-token/refresh-token.module";
import { AuthModule } from "../auth/auth.module";
import { PermissionModule } from "../permission/permission.module";
import { RoleModule } from "../roles/role.module";
import { Product, ProductSchema } from "src/schema/product.schema";
import { User, UserSchema } from "src/schema/user.schema";

@Module({
    imports:[MongooseModule.forFeature([{name:Review.name,schema:ReviewSchema}]),
    MongooseModule.forFeature([{name:Product.name,schema:ProductSchema}]),
    MongooseModule.forFeature([{name:User.name,schema:UserSchema}]),
    forwardRef(()=>RefreshTokenModule),
    forwardRef(()=>AuthModule),
    forwardRef(()=>PermissionModule),
    forwardRef(()=>RoleModule)

],
providers:[ReviewService],
controllers:[ReviewController],
})
export class ReviewModule{}