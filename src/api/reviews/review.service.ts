import {
    ForbiddenException,
    forwardRef,
    Inject,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { UserService } from "../users/users.service";
import { Review } from "src/schema/reviews.schema";
import { ReviewDocument } from "src/schema/reviews.schema";
import { CreateReviewRequest, ReplyReviewRequest } from "src/payload/request/review.request";
import { Product, ProductDocument } from "src/schema/product.schema";
import { ProductService } from "../products/products.service";
import { ReviewResponse } from "src/payload/response/review.respone";

@Injectable()
export class ReviewService {
    constructor(
        @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
        @Inject(forwardRef(() => ProductService))
        private readonly productService: ProductService,
        private readonly userService: UserService,
    ) { }

    async createReview(
        id: string,
        createReviewDto: CreateReviewRequest,
        userId: string,
    ): Promise<Review> {
        await this.productService.getSingleProduct(id);
        await this.userService.findUserById(userId);
    
        const createReview = new this.reviewModel({
            ...createReviewDto,
            userId: userId,
            productId: id,
        });

        const savedReview = await createReview.save();

        const updatedProduct = await this.productModel
            .findByIdAndUpdate(
                id,
                { $push: { reviews: savedReview._id } },
                { new: true }
            )
            .exec();
    
        if (!updatedProduct) {
            throw new NotFoundException('Product not found');
        }
    
        return savedReview;
    }

    async createReply(replyReviewDto: ReplyReviewRequest, userId: string, id: string): Promise<Review> {
        const createReply = {
            ...replyReviewDto,
            userId: userId,
            _id: new Types.ObjectId(id),
        }
        let replys = await this.reviewModel.findById(id);

        if (replys.reply) {
            replys.reply.push(createReply);
        } else {
            replys.reply = [createReply];
        }

        const updatedReview = await this.reviewModel.findByIdAndUpdate(id, { $set: { reply: replys.reply } }, { new: true });

        if (!updatedReview) {
            throw new NotFoundException("Review not found");
        }

        return updatedReview;
    }

    async getReview(id: string[]): Promise<Review[]> {
        const reviews = await this.reviewModel
            .find({ _id: { $in: id } })
            .exec();

        if (!reviews) {
            throw new NotFoundException("Review not found");
        }

        return reviews;
    }

    async getReviews(): Promise<any[]> {
        const reviews = await this.reviewModel.find().exec();
    
        if (!reviews || reviews.length === 0) {
            throw new NotFoundException("Review not found");
        }
    
        const reviewsResponse = await Promise.all(
            reviews.map(async (review) => {
                const product = await this.productModel.findById(review.productId).lean().exec();
                const user = await this.userService.findUserById(review.userId);
    
                return {
                    _id: review._id,
                    productId: review.productId,
                    userId: review.userId,
                    reviewText: review.reviewText,
                    rating: review.rating,
                    reply: review.reply || [],
                    createdAt: review.createdAt,
                    updatedAt: review.updatedAt,
                    productName: product?.Product_name || "Unknown Product",
                    fullName: user?.fullName || "Unknown User",
                    avatar: user?.avatar || "",
                };
            })
        );
    
        return reviewsResponse;
    }    

    async getReviewsRating(id: string[]): Promise<Review[]> {
        const reviews = await this.reviewModel
            .find({ _id: { $in: id } }, { _id: 0, rating: 1 })
            .exec();

        if (!reviews) {
            throw new NotFoundException("Review not found");
        }

        return reviews;
    }

    async getReviewById(id: string): Promise<Review> {
        const review = await this.reviewModel.findById(id);
        if (!review) {
            throw new NotFoundException("Review not found");
        }
        return review;
    }

    async deleteReview(id: string, userId: string): Promise<string> {
        await this.userService.findUserById(userId);
        const review = await this.reviewModel.findById(id);
       
        await this.productModel.findByIdAndUpdate(review.productId, { $pull: { reviews: id } }, { new: true });

        if (!review) {
            throw new NotFoundException("Review not found");
        }

        if (review.userId.toString() !== userId) {
            throw new ForbiddenException("You are not allowed to delete this review");
        }

        const deletedReview = await this.reviewModel.findByIdAndDelete(id);

        if (!deletedReview) {
            throw new NotFoundException("Review not found");
        }

        return "Review deleted successfully";
    }
}