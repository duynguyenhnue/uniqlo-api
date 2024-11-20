import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { InventoriesService } from "./inventories.service";
import {
  CreateInventoryRequest,
  SearchInventoryRequest,
} from "src/payload/request/inventories.request";
import { InventoryResponse } from "src/payload/response/inventories.respone";
import { IResponse } from "src/common/interface/response.interface";
import { successResponse } from "src/common/dto/response.dto";
import { UpdateCategoryRequest } from "src/payload/request/categories.request";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("inventories")
export class InventoriesController {
  constructor(private readonly inventoriesService: InventoriesService) {}

  @Post()
  @ApiBearerAuth("access_token")
  async create(
    @Body() createInventoryRequest: CreateInventoryRequest
  ): Promise<IResponse<InventoryResponse>> {
    const inventory = await this.inventoriesService.create(
      createInventoryRequest
    );
    return successResponse(inventory);
  }

  @Get("search")
  @ApiBearerAuth("access_token")
  async search(@Query() query: SearchInventoryRequest) {
    return this.inventoriesService.search(query);
  }

  @Get()
  @ApiBearerAuth("access_token")
  async findAll(): Promise<InventoryResponse[]> {
    return this.inventoriesService.findAll();
  }

  @Get(":id")
  @ApiBearerAuth("access_token")
  async findOne(@Param("id") id: string): Promise<InventoryResponse> {
    return this.inventoriesService.findOne(id);
  }

  @Put(":id")
  @ApiBearerAuth("access_token")
  async update(
    @Param("id") id: string,
    @Body() updateCategoryRequest: UpdateCategoryRequest
  ): Promise<InventoryResponse> {
    return this.inventoriesService.update(id, updateCategoryRequest);
  }

  @Delete(":id")
  @ApiBearerAuth("access_token")
  async delete(@Param("id") id: string): Promise<{ message: string }> {
    await this.inventoriesService.delete(id);
    return { message: `Delete Successfully` };
  }
}
