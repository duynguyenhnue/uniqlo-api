import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
} from "@nestjs/common";
import { ReviewService } from "./review.service";
import {
  CreateReviewRequest,
  ReplyReviewRequest,
} from "../../payload/request/review.request";
import { successResponse } from "../../common/dto/response.dto";
import { ParseObjectIdPipe } from "../../config/parse-objectId-pipe";
import { AuthJwtAccessProtected } from "../../common/guards/role.guard";
import { AUTH_PERMISSIONS } from "../../enums/auth.enum";
import { CommonException } from "../../common/exception/common.exception";
import { SkipAuth } from "../../config/skip.auth";

@Controller("reviews")
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  @SkipAuth()
  async getReview() {
    return this.reviewService.getReviews();
  }

  @Get("/:id")
  @SkipAuth()
  async getReviewById(@Param("id", ParseObjectIdPipe) id: string) {
    return this.reviewService.getReviewById(id);
  }

  @Post("/reply/:id")
  // @AuthJwtAccessProtected(AUTH_PERMISSIONS.REVIEW_CREATE)
  async createReply(
    @Param("id", ParseObjectIdPipe) id: string,
    @Body() replyReviewDto: ReplyReviewRequest,
    @Req() req
  ) {
    return this.reviewService.createReply(replyReviewDto, req.user.id, id);
  }

  @Post("/:id")
  // @AuthJwtAccessProtected(AUTH_PERMISSIONS.REVIEW_CREATE)
  async createReview(
    @Param("id", ParseObjectIdPipe) id: string,
    @Body() createReviewDto: CreateReviewRequest,
    @Req() req
  ) {
    try {
      const savedReview = await this.reviewService.createReview(
        id,
        createReviewDto,
        req.user.id
      );
      return successResponse(savedReview);
    } catch (error) {
      throw new CommonException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete("/:id")
  // @AuthJwtAccessProtected(AUTH_PERMISSIONS.REVIEW_DELETE)
  async deleteReview(@Param("id", ParseObjectIdPipe) id: string, @Req() req) {
    return this.reviewService.deleteReview(id, req.user.id);
  }
}
