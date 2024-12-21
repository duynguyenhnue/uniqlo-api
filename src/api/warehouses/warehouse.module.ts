import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule, Schema } from "@nestjs/mongoose";
import { Mongoose } from "mongoose";
import { Warehouse, WarehouseSchema } from "../../schema/warehouse.shema";
import { WarehouseService } from "./warehouse.service";
import { WarehouseController } from "./warehouse.controller";
import { RefreshTokenModule } from "../refresh-token/refresh-token.module";
import { AuthModule } from "../auth/auth.module";
import { PermissionModule } from "../permission/permission.module";
import { RoleModule } from "../roles/role.module";
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Warehouse.name, schema: WarehouseSchema },
    ]),
    forwardRef(() => RefreshTokenModule),
    forwardRef(() => AuthModule),
    forwardRef(() => PermissionModule),
    forwardRef(() => RoleModule),
  ],
  providers: [WarehouseService],
  controllers: [WarehouseController],
})
export class WarehouseModel {}
