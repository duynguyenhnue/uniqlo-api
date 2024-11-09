import { Module } from "@nestjs/common";
import { MongooseModule, Schema } from "@nestjs/mongoose";
import { Mongoose } from "mongoose";
import { Warehouse, WarehouseSchema } from "src/schema/warehouse.shema";
import { WarehouseService } from "./warehouse.service";
import { WarehouseController } from "./warehouse.controller";

@Module({
    imports:[MongooseModule.forFeature([{name:Warehouse.name,schema:WarehouseSchema}]),

],
providers:[WarehouseService],
controllers:[WarehouseController],
})
export class WarehouseModel{}