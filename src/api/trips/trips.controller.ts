import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { Trip } from "src/schema/trip.schema";
import { TripsService } from "./trips.service";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.gaurd";
import {
  CreateTripsRequest,
  UpdateTripsRequest,
} from "src/payload/request/trips.request";

@Controller("trips")
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  async createTrip(
    @Body() createTripRequest: CreateTripsRequest
  ): Promise<Trip> {
    return this.tripsService.createTrip(createTripRequest);
  }

  @Get(":id")
  async getTrip(@Param("id") id: string): Promise<Trip> {
    return this.tripsService.findTripById(id);
  }

  @Put(":id")
  async updateTrip(
    @Param("id") id: string,
    @Body() updateTripRequest: UpdateTripsRequest
  ): Promise<Trip> {
    return this.tripsService.updateTrip(id, updateTripRequest);
  }

  @Delete(":id")
  async deleteTrip(@Param("id") id: string): Promise<void> {
    return this.tripsService.deleteTrip(id);
  }

  @Get("user/:userId")
  async getTripsByUser(@Param("userId") userId: string): Promise<Trip[]> {
    return this.tripsService.findTripsByUser(userId);
  }
}
