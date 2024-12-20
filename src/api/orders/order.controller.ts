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
import { IResponse } from "../../common/interface/response.interface";
import { successResponse } from "../../common/dto/response.dto";
import { AuthJwtAccessProtected } from "../../common/guards/role.guard";
import { AUTH_PERMISSIONS } from "../../enums/auth.enum";
import { SkipAuth } from "../../config/skip.auth";
import { OrderService } from "./order.service";
import {
  CreateOrderRequest,
  SearchOrderbyIdRequest,
  UpdateOrderRequest,
} from "../../payload/request/order.request";
import { OrderRespone } from "../../payload/response/order.respone";
import { query } from "express";
import { Auth } from "firebase-admin/lib/auth/auth";
@Controller("orders")
export class OrderController {
  constructor(private readonly services: OrderService) {}

  @Post()
  // @AuthJwtAccessProtected(AUTH_PERMISSIONS.ORDERS_CREATE)
  async create(
    @Req() req: any,
    @Body() createOrderRequest: CreateOrderRequest
  ): Promise<OrderRespone> {
    try {
      const userId = req.user?._id;
      if (!userId) {
        throw new BadRequestException("User ID is required");
      }
      return this.services.createOrder(userId, createOrderRequest);
    } catch (error) {
      throw new Error(`Error create order ${error.message}`);
    }
  }

  @Get()
  @SkipAuth()
  async getAll() {
    try {
      return this.services.findAll();
    } catch (error) {
      throw new Error(`Error ${error.message}`);
    }
  }

  @Get("search")
  @SkipAuth()
  async search(@Query() query: SearchOrderbyIdRequest) {
    try {
      return this.services.search(query);
    } catch (error) {
      throw new Error(`Error ${error.message}`);
    }
  }

  @Get("search/history")
  async history(@Req() req) {
    try {
      return this.services.findAllHistory(req.user._id);
    } catch (error) {
      throw new Error(`Error ${error.message}`);
    }
  }

  @Get()
  @SkipAuth()
  async findAll(): Promise<OrderRespone[]> {
    try {
      return await this.services.findAll();
    } catch (error) {
      throw new BadRequestException(`Error ${error.message}`);
    }
  }

  @Get(":orderId")
  @SkipAuth()
  async findOne(@Param("orderId") orderId: string): Promise<OrderRespone> {
    try {
      return await this.services.findOne(orderId);
    } catch (error) {
      throw new BadRequestException(`Error ${error.message}`);
    }
  }

  @Put(":orderId")
  // @AuthJwtAccessProtected(AUTH_PERMISSIONS.ORDERS_UPDATE)
  @SkipAuth()
  async update(
    @Req() req: any,
    @Param("orderId") orderId: string,
    @Body() update: UpdateOrderRequest
  ): Promise<OrderRespone> {
    try {
      const userId = req.user?._id;
      if (!userId) {
        throw new BadRequestException("User ID is required");
      }
      return await this.services.updateOrder(userId, orderId, update);
    } catch (error) {
      throw new BadRequestException(`Error ${error.message}`);
    }
  }

  @Put(":orderId/status")
  // @AuthJwtAccessProtected(AUTH_PERMISSIONS.ORDERS_UPDATE)
  @SkipAuth()
  async updateOrderstatus(
    @Param("orderId") orderId: string,
    @Body("status") status: string
  ): Promise<IResponse<OrderRespone>> {
    try {
      const updateOrrderstatus = await this.services.updateorderstatus(
        orderId,
        status
      );
      return successResponse(updateOrrderstatus);
    } catch (error) {
      throw new BadRequestException(
        `Error update status order ${error.message}`
      );
    }
  }
}
