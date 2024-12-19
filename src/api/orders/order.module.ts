import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/schema/order.schema';
import { Product, ProductSchema } from 'src/schema/product.schema';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Discount, DiscountSchema } from 'src/schema/discount.schema';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module';
import { AuthModule } from '../auth/auth.module';
import { PermissionModule } from '../permission/permission.module';
import { RoleModule } from '../roles/role.module';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Product.name, schema: ProductSchema }, 
      { name: Discount.name, schema: DiscountSchema },
    ]),
    forwardRef(()=>RefreshTokenModule),
    forwardRef(()=>AuthModule),
    forwardRef(()=>PermissionModule),
    forwardRef(()=>RoleModule)
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
