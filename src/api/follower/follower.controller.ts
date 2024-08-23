import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { Follower } from 'src/payload/schema/follower.schema';
import { CreateFollowerRequest } from 'src/payload/request/follower.request';

@Controller('followers')
export class FollowerController {
  constructor(private readonly followerService: FollowerService) {}

  @Post()
  async followUser(@Body() followUserRequest: CreateFollowerRequest): Promise<Follower> {
    return this.followerService.followUser(followUserRequest);
  }

  @Get(':userId')
  async getFollowers(@Param('userId') userId: string): Promise<Follower[]> {
    return this.followerService.findFollowersByUserId(userId);
  }

  @Delete(':followerId')
  async unfollowUser(@Param('followerId') followerId: string): Promise<void> {
    return this.followerService.unfollowUser(followerId);
  }
}
