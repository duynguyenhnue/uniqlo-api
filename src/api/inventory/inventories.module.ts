import { Model } from "mongoose";
import { InventoriesController } from "./inventories.controller";
import { InventoriesService } from "./inventories.service";
import { InventoriesSchema, Inventory } from "src/schema/inventories.schema";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports:[MongooseModule.forFeature([{name:Inventory.name,schema:InventoriesSchema}]),

],
providers:[InventoriesService],
controllers:[InventoriesController],
})
export class InventoriesModel{}