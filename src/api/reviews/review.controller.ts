import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from "@nestjs/common";
import { ReviewService } from "./review.service";
import {
  CreateReview,
  SearchReview,
  UpdateReview,
} from "src/payload/request/review.request";
import { IResponse } from "src/common/interface/response.interface";
import { ReviewResponse } from "src/payload/response/review.respone";
import { successResponse } from "src/common/dto/response.dto";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AuthJwtAccessProtected } from "src/common/guards/role.guard";
import { AUTH_PERMISSIONS } from "src/enums/auth.enum";
import { SkipAuth } from "src/config/skip.auth";

@Controller("reviews")
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @ApiBearerAuth("access_token")
  @AuthJwtAccessProtected(AUTH_PERMISSIONS.REVIEWS_CREATE)
  async create(
    @Req() req:any,
    @Body() create: CreateReview
  ): Promise<IResponse<ReviewResponse>> {
    try{
      const userId=req.user._id;
    const review = await this.reviewService.create(create,userId);
    return successResponse(review);
    }catch(error)
    {
      throw error;
    }
  }

  @Get("search")
  @SkipAuth()
  // @AuthJwtAccessProtected(AUTH_PERMISSIONS.REVIEWS_VIEW)
  @ApiBearerAuth("access_token")
  async search(@Query() query: SearchReview) {
    return this.reviewService.search(query);
  }

  @Get()
  @SkipAuth()
  @ApiBearerAuth("access_token")
  // @AuthJwtAccessProtected(AUTH_PERMISSIONS.REVIEWS_VIEW)
  async findAll(): Promise<ReviewResponse[]> {
    return this.reviewService.findAll();
  }

  @Get(":id")
  @SkipAuth()
  // @AuthJwtAccessProtected(AUTH_PERMISSIONS.REVIEWS_VIEW)
  @ApiBearerAuth("access_token")
  async findOne(@Param("id") id: string): Promise<ReviewResponse> {
    return this.reviewService.findOne(id);
  }
  @Put(":id")
  @AuthJwtAccessProtected(AUTH_PERMISSIONS.REVIEWS_UPDATE)
  @ApiBearerAuth("access_token")
  async update(
    @Param("id") id: string,
    @Body() updatereview: UpdateReview
  ): Promise<IResponse<ReviewResponse>> {
    try{
    const review =await this.reviewService.update(id,updatereview)
    return successResponse(review);
    }catch(error)
    {
      throw error;
    }
  }

  @Delete(":id")
  @ApiBearerAuth("access_token")
  @AuthJwtAccessProtected(AUTH_PERMISSIONS.REVIEWS_DELETE)
  async delete(@Req() req:any,@Param("id") id: string): Promise<IResponse<{ message: string}>> {
    await this.reviewService.delete(id);
    return successResponse({ message: `Delete Successfully` });
  }
}
