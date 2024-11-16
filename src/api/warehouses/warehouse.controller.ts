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
  } from "@nestjs/common";
import { WarehouseService } from "./warehouse.service";
import { CreateWarehouseRequest, SearchWarehouseRequest, UpdateWarehouseRequest } from "src/payload/request/warehouse.request";
import { WarehouseResponse } from "src/payload/response/warehouse.respone";
import { IResponse } from "src/common/interface/response.interface";
import { successResponse } from "src/common/dto/response.dto";

  @Controller("warehouses")
  export class WarehouseController{
    constructor(private readonly  warehouseService:WarehouseService){}

    @Post()
    async create(
      @Body() createWarehouseRequest: CreateWarehouseRequest
    ): Promise<IResponse<WarehouseResponse>> { 
      const warehouse = await this.warehouseService.create(createWarehouseRequest);
      return successResponse(warehouse); 
    }

    @Get('search')
  async search(@Query()query:SearchWarehouseRequest){
    return this.warehouseService.search(query);
  }

  @Get()
  async findAll(): Promise<WarehouseResponse[]> {
    return this.warehouseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<WarehouseResponse> {
    return this.warehouseService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id')id:string,
    @Body() updateWarehouseRequest:UpdateWarehouseRequest
  ):Promise<WarehouseResponse>{
    return this.warehouseService.update(id,updateWarehouseRequest);
  }

  @Delete(':id')
  async delete(@Param('id')id:string):Promise<{message:string}>{
    await this.warehouseService.delete(id);
    return {message:`Delete Successfully`};
  }
  }