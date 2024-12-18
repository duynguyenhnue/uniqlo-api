import {
    Controller,
    Body,
    Post,
    Get,
    Param,
    Put,
    Delete,
    Query,
    NotFoundException,
    Req,
    BadRequestException,
  } from "@nestjs/common";
import { IResponse } from "src/common/interface/response.interface";
import { successResponse } from "src/common/dto/response.dto";
import { AuthJwtAccessProtected } from "src/common/guards/role.guard";
import { AUTH_PERMISSIONS } from "src/enums/auth.enum";
import { SkipAuth } from "src/config/skip.auth";
import { OrderService } from "./order.service";
import { CreateOrderRequest, SearchOrderbyIdRequest, UpdateOrderRequest } from "src/payload/request/order.request";
import { OrderRespone } from "src/payload/response/order.respone";
import { query } from "express";
import { Auth } from "firebase-admin/lib/auth/auth";
@Controller("orders")
export class OrderController{
    constructor(private readonly services:OrderService){}

    @Post()
    @AuthJwtAccessProtected(AUTH_PERMISSIONS.ORDERS_CREATE)
    async create(
        @Req() req:any,
        @Body() createOrderRequest:CreateOrderRequest
    ):Promise<OrderRespone>
    {
        try{
            const userId = req.user?._id;
            if (!userId) {
              throw new BadRequestException('User ID is required');
            }
        return this.services.createOrder(userId,createOrderRequest)
        }catch(error)
        {
            throw new Error(`Error create order ${error.message}`);
        }
    }

    @Get('search')
    @SkipAuth()
    async search(@Query() query:SearchOrderbyIdRequest){
        try{
            return this.services.search(query);
        }catch(error)
        {
            throw new Error(`Error ${error.message}`);
        }
    }

    @Get()
    @SkipAuth()
    async findAll(): Promise<OrderRespone[]> {
      return this.services.findAll();
    }

    @Get(":orderId")
    @SkipAuth()
    async findOne(@Param("orderId") orderId: string): Promise<OrderRespone> {
      return this.services.findOne(orderId);
    }

    @Put(":orderId")
    @AuthJwtAccessProtected(AUTH_PERMISSIONS.ORDERS_UPDATE)
  async update(
    @Req() req:any,
    @Param("orderId") orderId: string,
    @Body() update: UpdateOrderRequest
  ): Promise<OrderRespone> {
    const userId = req.user?._id;
            if (!userId) {
              throw new BadRequestException('User ID is required');
            }
    return this.services.updateOrder(userId,orderId, update);
  }

    @Put(':orderId/status')
    @AuthJwtAccessProtected(AUTH_PERMISSIONS.ORDERS_UPDATE)
    async updateOrderstatus(
        @Param('orderId')orderId:string,
        @Body('status')status:string
    ):Promise<IResponse<OrderRespone>>{
        try{
            const updateOrrderstatus=await this.services.updateorderstatus(orderId,status)
            return successResponse(updateOrrderstatus);
        }catch(error)
        {
            throw new BadRequestException(`Error update status order ${error.message}`);
        }
    }
}