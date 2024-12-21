import { Model } from "mongoose";
import { InventoriesController } from "./inventories.controller";
import { InventoriesService } from "./inventories.service";
import { InventoriesSchema, Inventory } from "../../schema/inventories.schema";
import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RefreshTokenModule } from "../refresh-token/refresh-token.module";
import { AuthModule } from "../auth/auth.module";
import { PermissionModule } from "../permission/permission.module";
import { RoleModule } from "../roles/role.module";
import { ProductModel } from "../products/products.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Inventory.name, schema: InventoriesSchema },
    ]),
    forwardRef(() => RefreshTokenModule),
    forwardRef(() => AuthModule),
    forwardRef(() => PermissionModule),
    forwardRef(() => RoleModule),
    forwardRef(() => ProductModel),
  ],
  providers: [InventoriesService],
  controllers: [InventoriesController],
})
export class InventoriesModel {}
