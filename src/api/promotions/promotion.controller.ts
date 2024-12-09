import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { PromotionService } from "./promotion.service";
import { CreatePromotionRequest, SearchPromotionRequest, UpdatePromotionRequest } from "src/payload/request/promotion.request";
import { IResponse } from "src/common/interface/response.interface";
import { successResponse } from "src/common/dto/response.dto";
import { PromotionResponse } from "src/payload/response/promotion.respone";
import { SkipAuth } from "src/config/skip.auth";

@Controller("promotions")
export class PromotionController{
    constructor(private readonly promotionService:PromotionService){}


    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @Body() createPromotionRequest: CreatePromotionRequest
  ): Promise<IResponse<PromotionResponse>> { 

    const promotion = await this.promotionService.create(createPromotionRequest);
    return successResponse(promotion); 
  }

  @SkipAuth()
  @Get('search')
  async search(@Query()query:SearchPromotionRequest){
    return this.promotionService.search(query);
  }
  @Get()
  async findAll(): Promise<PromotionResponse[]> {
    return this.promotionService.findAll();
  }

  @SkipAuth()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PromotionResponse> {
    return this.promotionService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id')id:string,
    @Body() updatePromotionRequest:UpdatePromotionRequest
  ):Promise<PromotionResponse>{
    return this.promotionService.update(id,updatePromotionRequest);
  }
  @Delete(':id')
  async delete(@Param('id')id:string):Promise<{message:string}>{
    await this.promotionService.delete(id);
    return {message:`Delete Successfully`};
  }
}