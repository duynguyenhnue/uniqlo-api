import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateActivityRequest } from "src/payload/request/activity.request";
import { Activity } from "src/schema/activity.schema";

@Injectable()
export class ActivityService {
  constructor(
    @InjectModel(Activity.name) private readonly activityModel: Model<Activity>
  ) {}

  async createActivity(
    createActivityRequest: CreateActivityRequest
  ): Promise<Activity> {
    const createdActivity = new this.activityModel(createActivityRequest);
    return createdActivity.save();
  }

  async findActivitiesByUserId(userId: string): Promise<Activity[]> {
    return this.activityModel.find({ user: userId }).exec();
  }
}
