import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { RefreshTokenModule } from "../refresh-token/refresh-token.module";
import { AuthModule } from "../auth/auth.module";
import { PermissionModule } from "../permission/permission.module";
import { RoleModule } from "../roles/role.module";
import { Blogdetails, BlogdetailsSchema } from "src/schema/blog-details.schema";
import { BlogDetailService } from "./blogdetails.service";
import { BlogDetailController } from "./blogdetails.controller";
@Module({
    imports:[MongooseModule.forFeature([{name:Blogdetails.name,schema:BlogdetailsSchema}]),
    forwardRef(()=>RefreshTokenModule),
    forwardRef(()=>AuthModule),
    forwardRef(()=>PermissionModule),
    forwardRef(()=>RoleModule)

],
providers:[BlogDetailService],
controllers:[BlogDetailController],
})
export class BlogdetailModel{}