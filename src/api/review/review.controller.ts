import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from "@nestjs/common";
import { ReviewService } from "./review.service";
import { Review } from "src/schema/review.schema";
import {
  CreateReviewRequest,
  UpdateReviewRequest,
} from "src/payload/request/review.request";

@Controller("reviews")
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async createReview(
    @Body() createReviewRequest: CreateReviewRequest
  ): Promise<Review> {
    return this.reviewService.createReview(createReviewRequest);
  }

  @Get(":id")
  async getReview(@Param("id") id: string): Promise<Review> {
    return this.reviewService.findReviewById(id);
  }

  @Put(":id")
  async updateReview(
    @Param("id") id: string,
    @Body() updateReviewRequest: UpdateReviewRequest
  ): Promise<Review> {
    return this.reviewService.updateReview(id, updateReviewRequest);
  }

  @Delete(":id")
  async deleteReview(@Param("id") id: string): Promise<void> {
    return this.reviewService.deleteReview(id);
  }

  @Get("trip/:tripId")
  async getReviewsByTrip(@Param("tripId") tripId: string): Promise<Review[]> {
    return this.reviewService.findReviewsByTrip(tripId);
  }
}
