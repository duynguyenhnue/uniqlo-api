import { forwardRef, Module } from "@nestjs/common";
import { PromotionService } from "./promotion.service";
import { PromotionController } from "./promotion.controller";
import { Promotion, PromotionSchema } from "src/schema/promotion.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { RefreshTokenModule } from "../refresh-token/refresh-token.module";
import { AuthModule } from "../auth/auth.module";
import { PermissionModule } from "../permission/permission.module";
import { RoleModule } from "../roles/role.module";

@Module({
    imports:[MongooseModule.forFeature([{name:Promotion.name,schema:PromotionSchema}]),
    forwardRef(()=>RefreshTokenModule),
    forwardRef(()=>AuthModule),
    forwardRef(()=>PermissionModule),
    forwardRef(()=>RoleModule)


],
providers:[PromotionService],
controllers:[PromotionController],
})
export class PromotionModel{}