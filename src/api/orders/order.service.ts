import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { count } from "console";
import { Model, Types } from "mongoose";
import { CreateOrderRequest, SearchOrderbyIdRequest, UpdateOrderRequest } from "src/payload/request/order.request";
import { OrderRespone } from "src/payload/response/order.respone";
import { Discount } from "src/schema/discount.schema";
import { Order } from "src/schema/order.schema";
import { Product } from "src/schema/product.schema";
@Injectable()
export class OrderService{
    constructor(
        @InjectModel(Order.name) private readonly orderModel:Model<Order>,
        @InjectModel(Product.name) private readonly productModel:Model<Product>,
        @InjectModel(Discount.name) private readonly discountModel:Model<Discount>,


){}

async createOrder(userId:string,create:CreateOrderRequest):Promise<OrderRespone>{
    const {orderItems,discountId}=create;
    let totalAmount=0;
    const updateOrderItems=[];
    for(const item of orderItems)
    {
        const product=await this.productModel.findById(item.productId).exec();

        if(!product)
        {
            throw new Error(`product with Id ${item.productId} not found`);
        }
        const totalPrice=product.Product_price*item.count;
        totalAmount+=totalPrice;
        updateOrderItems.push({
            productId:item.productId,
            count:item.count,
            totalPrice:totalPrice
        })
    }
    let discountAmount=0;
    if(discountId)
    {
        const discount=await this.discountModel.findById(discountId).exec();
        if(discount)
        {
            if(discount.type.toString()==='percent')
            {
                discountAmount=(discount.value/100)*totalAmount
            } else if(discount.type.toString()==='fixed')
            {
                discountAmount=discount.value;
            }
        }
    }
    const finalAmount=totalAmount-discountAmount;


    const order =new this.orderModel({
        userId,
        orderItems:updateOrderItems,
        totalAmount,
        finalAmount,
        discountAmount,
        status:'Pending',

    });
    await order.save();
    return this.mapOrderToResponse(order);
}

async search(query:SearchOrderbyIdRequest):Promise<{data:OrderRespone[];total:number}>
{
    try{
        const {limit=6,page=0,orderId}=query;
    const offset=(page)*limit;
    const filter: any = {};

    if(orderId)
        {
            const value=String(orderId).trim();
            filter.orderId={ $regex: value, $options: "i"};
        }
        const data = await this.orderModel
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .exec();
      const total=await this.orderModel.countDocuments(filter).exec();
      return{
        data:data.map(this.mapOrderToResponse),
      total,
      };
    }catch(error)
    {
        throw new Error(`Error ${error.message}`);
    }

}

async findAll():Promise<OrderRespone[]>{
    try{
        const order=await this.orderModel.find().exec();
        return order.map(o=>this.mapOrderToResponse(o))
    }catch(error)
    {
        throw new Error(`Error ${error.message}`);
    }
}

async findOne(id:string):Promise<OrderRespone>
{
    try{
        const order =await this.orderModel.findById(id).exec();
        if(!order)
            {
                throw new NotFoundException(`Order with Id ${id} not found`);
            }
        return this.mapOrderToResponse(order)
    }catch(error)
    {
        throw new Error(`error ${error.message}`);
    }
}

async updateOrder(userId:string,orderId:string,update:UpdateOrderRequest):Promise<OrderRespone>
{
    try{
        const order = await this.orderModel.findById(orderId).exec();
  if (!order) {
    throw new Error(`Order with Id ${orderId} not found`);
  }
  const updatedOrderItems = [];
  const {orderItems,discountId}=update;
    let totalAmount=0;

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
      totalPrice: totalPrice,
    });
  }
  let discountAmount = 0;
  if (discountId) {
    const discount = await this.discountModel.findById(discountId).exec();
    if (discount) {
      if (discount.type.toString() === 'percent') {
        discountAmount = (discount.value / 100) * totalAmount;
      } else if (discount.type.toString() === 'fixed') {
        discountAmount = discount.value;
      }
    }
  }

  const finalAmount=totalAmount-discountAmount;
  order.orderItems = updatedOrderItems;
  order.totalAmount = totalAmount;
    order.finalAmount = finalAmount;
    order.discountAmount = discountAmount;
    order.status = 'Pending';


    
    await order.save();
    return this.mapOrderToResponse(order);

    }catch(error)
    {
        throw new Error(`error ${error.message}`);
    }
}

async updateorderstatus(orderId:string,status:string):Promise<OrderRespone>
{
    const validatestatus=['Pending','Processing','Completed','Cancelled'];
    if(!validatestatus.includes(status))
    {
        throw new Error(`Invalid status. Please input 'Pending','Processing','Completed','Cancelled'`);
    }
    const order=await this.orderModel.findById(orderId).exec();
    if(!order)
    {
        throw new NotFoundException(`Not found`);
    }
    order.status=status;
    await order.save();
    return this.mapOrderToResponse(order);
}




private mapOrderToResponse(order: Order): OrderRespone {
    return {
        id:order._id.toString(),
        userId: order.userId.toString(),
      orderItems:order.orderItems? order.orderItems.map(item => ({
        id:item.productId? item.productId.toString():"",
        productId:item.productId.toString(),
        count: item.count,
        totalPrice: item.totalPrice,
      })):[],
      discountId: order.discountId ? order.discountId.toString() : null,
      discountAmount: order.discountAmount,
      totalAmount: order.totalAmount,
      finalAmount: order.finalAmount,
      status: order.status,
      createdAt:order.createdAt,
      updatedAt:order.updatedAt
        
        
    };
}
}