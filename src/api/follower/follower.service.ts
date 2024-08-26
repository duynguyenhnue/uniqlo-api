import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateFollowerRequest } from "src/payload/request/follower.request";
import { Follower } from "src/schema/follower.schema";

@Injectable()
export class FollowerService {
  constructor(
    @InjectModel(Follower.name) private readonly followerModel: Model<Follower>
  ) {}

  async followUser(
    followUserRequest: CreateFollowerRequest
  ): Promise<Follower> {
    const createdFollower = new this.followerModel(followUserRequest);
    return createdFollower.save();
  }

  async findFollowersByUserId(userId: string): Promise<Follower[]> {
    return this.followerModel.find({ user: userId }).exec();
  }

  async unfollowUser(followerId: string): Promise<void> {
    const result = await this.followerModel
      .findByIdAndDelete(followerId)
      .exec();
    if (!result) {
      throw new NotFoundException(`Follower with ID ${followerId} not found`);
    }
  }
}
