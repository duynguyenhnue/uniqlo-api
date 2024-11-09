import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
 import { UserModule } from "./api/users/users.module";
import { AuthModule } from "./api/auth/auth.module";

import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./common/guards/jwt-auth.gaurd";
import { RefreshTokenModule } from "./api/refresh-token/refresh-token.module";
import { RoleModule } from "./api/roles/role.module";
import { PermissionModule } from "./api/permission/permission.module";
import { ConfigModule } from "@nestjs/config";
import { CategoryModel } from "./api/categories/categories.module";
import { ProductModel } from "./api/products/products.module";
import { WarehouseModel } from "./api/warehouses/warehouse.module";
import { InventoriesModel } from "./api/inventory/inventories.module";
import { PromotionModel } from "./api/promotions/promotion.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_MONGO_SRC),
    UserModule,
    AuthModule,
    RefreshTokenModule,
    RoleModule,
    PermissionModule,
    CategoryModel,
    ProductModel,
    WarehouseModel,
    InventoriesModel,
    PromotionModel,
    

  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
