import { Module } from "@nestjs/common";
import { PromotionService } from "./promotion.service";
import { PromotionController } from "./promotion.controller";
import { Promotion, PromotionSchema } from "src/schema/promotion.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports:[MongooseModule.forFeature([{name:Promotion.name,schema:PromotionSchema}]),

],
providers:[PromotionService],
controllers:[PromotionController],
})
export class PromotionModel{}