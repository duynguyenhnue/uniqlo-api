import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { ActivityService } from "./activity.service";
import { Activity } from "src/schema/activity.schema";
import { CreateActivityRequest } from "src/payload/request/activity.request";

@Controller("activities")
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  async createActivity(
    @Body() createActivityRequest: CreateActivityRequest
  ): Promise<Activity> {
    return this.activityService.createActivity(createActivityRequest);
  }

  @Get(":userId")
  async getActivitiesByUser(
    @Param("userId") userId: string
  ): Promise<Activity[]> {
    return this.activityService.findActivitiesByUserId(userId);
  }
}
