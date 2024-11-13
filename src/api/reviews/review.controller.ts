import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ReviewService } from "./review.service";
import { CreateReview, SearchReview, UpdateReview } from "src/payload/request/review.request";
import { IResponse } from "src/common/interface/response.interface";
import { ReviewResponse } from "src/payload/response/review.respone";
import { successResponse } from "src/common/dto/response.dto";

@Controller("reviews")
export class ReviewController{
    constructor(private readonly reviewService:ReviewService ){}

    @Post()
    async create(
        @Body()create:CreateReview
    ):Promise<IResponse<ReviewResponse>>
    {
        const review=await this.reviewService.create(create);
        return successResponse(review);
    }
    @Get('search')
    async search(@Query()query:SearchReview){
      return this.reviewService.search(query);
    }  
    @Get()
    async findAll(): Promise<ReviewResponse[]> {
      return this.reviewService.findAll();
    }
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ReviewResponse> {
      return this.reviewService.findOne(id);
    }
    @Put(':id')
    async update(
      @Param('id')id:string,
      @Body() productUpdateRequest:UpdateReview
    ):Promise<ReviewResponse>{
      return this.reviewService.update(id,productUpdateRequest);
    }
    @Delete(':id')
    async delete(@Param('id')id:string):Promise<{message:string}>{
      await this.reviewService.delete(id);
      return {message:`Delete Successfully`};
    }

}