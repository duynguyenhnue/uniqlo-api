import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { count } from "console";
import { Model, Types } from "mongoose";
import { find } from "rxjs";
import {
  CreateOrderRequest,
  SearchOrderbyIdRequest,
  UpdateOrderRequest,
} from "../../payload/request/order.request";
import { OrderRespone } from "../../payload/response/order.respone";
import { Discount } from "../../schema/discount.schema";
import { Order } from "../../schema/order.schema";
import { Product } from "../../schema/product.schema";
import { User } from "../../schema/user.schema";
@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(Discount.name) private readonly discountModel: Model<Discount>,
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  async createOrder(
    userId: string,
    create: CreateOrderRequest
  ): Promise<OrderRespone> {
    try {
      const { orderItems, discountId } = create;
      let totalAmount = 0;
      const updateOrderItems = [];
      for (const item of orderItems) {
        const product = await this.productModel.findById(item.productId).exec();

        if (!product) {
          throw new Error(`product with Id ${item.productId} not found`);
        }
        const totalPrice = product.Product_price * item.count;
        totalAmount += totalPrice;
        updateOrderItems.push({
          productId: item.productId,
          count: item.count,
          color: item.color,
          size: item.size,
          totalPrice: totalPrice,
        });
      }
      let discountAmount = 0;
      if (discountId) {
        const discount = await this.discountModel.findById(discountId).exec();
        if (discount) {
          if (discount.type.toString() === "percent") {
            discountAmount = (discount.value / 100) * totalAmount;
          } else if (discount.type.toString() === "fixed") {
            discountAmount = discount.value;
          }
        }
      }
      const finalAmount = totalAmount - discountAmount;

      const order = new this.orderModel({
        userId,
        orderItems: updateOrderItems,
        totalAmount,
        finalAmount,
        discountAmount,
        status: "Pending",
        discountId: discountId ? new Types.ObjectId(discountId) : null,
      });
      await order.save();
      const user = await this.userModel.findById(userId).exec();
      const products = await this.productModel
        .find({ _id: { $in: orderItems.map((item) => item.productId) } })
        .exec();
      return this.mapOrderToResponse(order, user, products);
    } catch (error) {
      throw new BadRequestException(
        `Error while create order ${error.message}`
      );
    }
  }

  async search(
    query: SearchOrderbyIdRequest
  ): Promise<{ data: OrderRespone[]; total: number }> {
    try {
      const { limit = 6, page = 0, orderId } = query;
      const offset = page * limit;
      const filter: any = {};

      if (orderId) {
        const value = String(orderId).trim();
        filter.orderId = { $regex: value, $options: "i" };
      }
      const data = await this.orderModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit)
        .exec();
      const total = await this.orderModel.countDocuments(filter).exec();
      const userIds = [
        ...new Set(data.map((order) => order.userId.toString())),
      ];
      const users = await this.userModel.find({ _id: { $in: userIds } }).exec();

      const productIds = [
        ...new Set(
          data.flatMap((order) =>
            order.orderItems.map((item) => item.productId.toString())
          )
        ),
      ];
      const products = await this.productModel
        .find({ _id: { $in: productIds } })
        .exec();
      return {
        data: data.map((o) =>
          this.mapOrderToResponse(
            o,
            users.find((user) => user._id.toString() === o.userId.toString()),
            products
          )
        ),
        total,
      };
    } catch (error) {
      throw new BadRequestException(`Error ${error.message}`);
    }
  }

  async findAllHistory(id: string): Promise<OrderRespone[]> {
    try {
      const order = await this.orderModel.find({ userId: id }).exec();

      const userIds = [
        ...new Set(order.map((order) => order.userId.toString())),
      ];
      const users = await this.userModel.find({ _id: { $in: userIds } }).exec();

      const productIds = [
        ...new Set(
          order.flatMap((order) =>
            order.orderItems.map((item) => item.productId.toString())
          )
        ),
      ];

      const products = await this.productModel
        .find({ _id: { $in: productIds } })
        .exec();
      return order.map((o) =>
        this.mapOrderToResponse(
          o,
          users.find((user) => user._id.toString() === o.userId.toString()),
          products
        )
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<OrderRespone[]> {
    try {
      const order = await this.orderModel.find().exec();
      const userIds = [
        ...new Set(order.map((order) => order.userId.toString())),
      ];
      const users = await this.userModel.find({ _id: { $in: userIds } }).exec();

      const productIds = [
        ...new Set(
          order.flatMap((order) =>
            order.orderItems.map((item) => item.productId.toString())
          )
        ),
      ];

      const products = await this.productModel
        .find({ _id: { $in: productIds } })
        .exec();
      return order.map((o) =>
        this.mapOrderToResponse(
          o,
          users.find((user) => user._id.toString() === o.userId.toString()),
          products
        )
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string): Promise<OrderRespone> {
    try {
      const order = await this.orderModel.findById(id).exec();
      if (!order) {
        throw new NotFoundException(`Order with Id ${id} not found`);
      }
      const user = await this.userModel.findById(order.userId).exec();
      const products = await this.productModel
        .find({ _id: { $in: order.orderItems.map((o) => o.productId) } })
        .exec();

      return this.mapOrderToResponse(order, user, products);
    } catch (error) {
      throw new BadRequestException(`error ${error.message}`);
    }
  }

  async updateOrder(
    userId: string,
    orderId: string,
    update: UpdateOrderRequest
  ): Promise<OrderRespone> {
    try {
      const order = await this.orderModel.findById(orderId).exec();
      if (!order) {
        throw new Error(`Order with Id ${orderId} not found`);
      }
      const updatedOrderItems = [];
      const { orderItems, discountId } = update;
      let totalAmount = 0;

      for (const item of orderItems) {
        const product = await this.productModel.findById(item.productId).exec();
        if (!product) {
          throw new Error(`Product with Id ${item.productId} not found`);
        }

        const totalPrice = product.Product_price * item.count;
        totalAmount += totalPrice;

        updatedOrderItems.push({
          productId: item.productId,
          count: item.count,
          color: item.color,
          size: item.size,
          totalPrice: totalPrice,
        });
      }
      let discountAmount = 0;
      if (discountId) {
        const discount = await this.discountModel.findById(discountId).exec();
        if (discount) {
          if (discount.type.toString() === "percent") {
            discountAmount = (discount.value / 100) * totalAmount;
          } else if (discount.type.toString() === "fixed") {
            discountAmount = discount.value;
          }
        }
      }

      const finalAmount = totalAmount - discountAmount;
      order.orderItems = updatedOrderItems;
      order.totalAmount = totalAmount;
      order.finalAmount = finalAmount;
      order.discountAmount = discountAmount;
      order.status = "Pending";

      await order.save();

      const user = await this.userModel.findById(order.userId).exec();
      const products = await this.productModel
        .find({ _id: { $in: order.orderItems.map((i) => i.productId) } })
        .exec();
      return this.mapOrderToResponse(order, user, products);
    } catch (error) {
      throw new BadRequestException(`error ${error.message}`);
    }
  }

  async updateorderstatus(
    orderId: string,
    status: string
  ): Promise<OrderRespone> {
    try {
      const validatestatus = [
        "Pending",
        "Processing",
        "Completed",
        "Cancelled",
      ];
      if (!validatestatus.includes(status)) {
        throw new Error(
          `Invalid status. Please input 'Pending','Processing','Completed','Cancelled'`
        );
      }
      const order = await this.orderModel.findById(orderId).exec();
      if (!order) {
        throw new NotFoundException(`Not found`);
      }
      order.status = status;
      await order.save();
      const user = await this.userModel.findById(order.userId);
      const products = await this.productModel
        .find({ _id: { $in: order.orderItems.map((i) => i.productId) } })
        .exec();
      return this.mapOrderToResponse(order, user, products);
    } catch (error) {
      throw new BadRequestException(
        `Error while update status order ${error.message}`
      );
    }
  }

  private mapOrderToResponse(
    order: Order,
    user: User | null,
    products: Product[] | null
  ): OrderRespone {
    try {
      return {
        id: order._id.toString(),
        userId: order.userId.toString(),
        user: user
          ? {
              email: user.email,
              fullName: user.fullName,
              phone: {
                country: user.phone?.country || "",
                number: user.phone?.number || "",
              },
              dateOfBirth: user.dateOfBirth,
              address: {
                province: user.address?.province || "",
                district: user.address?.district || "",
                ward: user.address?.ward || "",
              },
              role: user?.role || "",
              gender: user?.gender || "",
              avatar: user?.avatar || "",
            }
          : undefined,
        orderItems: order.orderItems
          ? order.orderItems.map((item) => {
              const product = products?.find(
                (p) => p._id.toString() === item.productId.toString()
              );
              return {
                id: item.productId ? item.productId.toString() : "",
                productId: item.productId.toString(),
                Product_name: product ? product.Product_name : "",
                Product_sku: product ? product.Product_sku : "",
                Product_brand: product ? product.Product_brand : "",
                Product_tag: product ? product.Product_tag : "",
                Product_description: product ? product.Product_description : "",
                Product_currency: product ? product.Product_currency : "",
                Product_images: product ? product.Product_images : [],
                Product_color: product ? product.Product_color : [],
                Product_size: product ? product.Product_size : [],
                Product_specifications: product
                  ? product.Product_specifications
                  : null,
                Product_price: product ? product.Product_price : 0,
                Product_count: product ? product.Product_count : 0,
                Product_isNewArrival: product
                  ? product.Product_isNewArrival
                  : false,
                Product_isBestSeller: product
                  ? product.Product_isBestSeller
                  : false,
                Product_isOnSale: product ? product.Product_isOnSale : false,
                categoryId: product.categoryId,
                favorite_users: product.favorite_users,
                color: item.color,
                size: item.size,
                count: item.count,
                totalPrice: item.totalPrice,
              };
            })
          : [],
        discountId: order.discountId ? order.discountId.toString() : null,
        discountAmount: order.discountAmount,
        totalAmount: order.totalAmount,
        finalAmount: order.finalAmount,
        status: order.status,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      };
    } catch (error) {
      throw new BadRequestException(`Error ${error.message}`);
    }
  }
}
