import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  CreateReviewRequest,
  UpdateReviewRequest,
} from "src/payload/request/review.request";
import { Review } from "src/schema/review.schema";

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>
  ) {}

  async createReview(
    createReviewRequest: CreateReviewRequest
  ): Promise<Review> {
    const createdReview = new this.reviewModel(createReviewRequest);
    return createdReview.save();
  }

  async findReviewById(id: string): Promise<Review> {
    const review = await this.reviewModel.findById(id).exec();
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    return review;
  }

  async updateReview(
    id: string,
    updateReviewRequest: UpdateReviewRequest
  ): Promise<Review> {
    const review = await this.reviewModel
      .findByIdAndUpdate(id, updateReviewRequest, { new: true })
      .exec();
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    return review;
  }

  async deleteReview(id: string): Promise<void> {
    const result = await this.reviewModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
  }

  async findReviewsByTrip(tripId: string): Promise<Review[]> {
    return this.reviewModel.find({ trip: tripId }).exec();
  }
}
