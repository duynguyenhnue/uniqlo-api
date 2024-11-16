import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CategoriesSchema, Category } from "../../schema/categories.schema";
import { CategoryService } from "../categories/categories.service";
import { CategoryController } from "../categories/categories.controller";

@Module({
    imports:[MongooseModule.forFeature([{name:Category.name,schema:CategoriesSchema}]),

],
providers:[CategoryService],
controllers:[CategoryController],
})
export class CategoryModel{}