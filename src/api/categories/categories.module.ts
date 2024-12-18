import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CategoriesSchema, Category } from "../../schema/categories.schema";
import { CategoryService } from "../categories/categories.service";
import { CategoryController } from "../categories/categories.controller";
import { RefreshTokenModule } from "../refresh-token/refresh-token.module";
import { AuthModule } from "../auth/auth.module";
import { PermissionModule } from "../permission/permission.module";
import { RoleModule } from "../roles/role.module";
import { ProductModel } from "../products/products.module";

@Module({
    imports:[MongooseModule.forFeature([{name:Category.name,schema:CategoriesSchema}]),
    forwardRef(()=>RefreshTokenModule),
    forwardRef(()=>AuthModule),
    forwardRef(()=>PermissionModule),
    forwardRef(()=>RoleModule),
    forwardRef(()=>ProductModel)
],
providers:[CategoryService],
controllers:[CategoryController],
})
export class CategoryModel{}