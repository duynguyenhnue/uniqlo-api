import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "src/schema/product.schema";
import { ProductService } from "../products/products.service";
import { ProductController } from "../products/products.controller";
import { RefreshTokenModule } from "../refresh-token/refresh-token.module";
import { AuthModule } from "../auth/auth.module";
import { PermissionModule } from "../permission/permission.module";
import { RoleModule } from "../roles/role.module";
import { UserModule } from "../users/users.module";
import { User, UserSchema } from "src/schema/user.schema";
@Module({
    imports:[MongooseModule.forFeature([{name:Product.name,schema:ProductSchema}]),
    MongooseModule.forFeature([{name:User.name,schema:UserSchema}]),
    forwardRef(()=>RefreshTokenModule),
    forwardRef(()=>AuthModule),
    forwardRef(()=>PermissionModule),
    forwardRef(()=>RoleModule),UserModule

],
providers:[ProductService],
controllers:[ProductController],
exports:[ProductService, MongooseModule]
})
export class ProductModel{}