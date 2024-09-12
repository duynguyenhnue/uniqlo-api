import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  CreateTripsRequest,
  UpdateTripsRequest,
} from "src/payload/request/trips.request";
import { Trip } from "src/schema/trip.schema";

@Injectable()
export class TripsService {
  constructor(
    @InjectModel(Trip.name) private readonly tripModel: Model<Trip>
  ) {}

  async createTrip(createTripsRequest: CreateTripsRequest): Promise<Trip> {
    const createdTrip = new this.tripModel(createTripsRequest);
    return createdTrip.save();
  }

  async findTripById(id: string): Promise<Trip> {
    const trip = await this.tripModel.findById(id).exec();
    if (!trip) {
      throw new NotFoundException(`Trip with ID ${id} not found`);
    }
    return trip;
  }

  async updateTrip(
    id: string,
    updateTripsRequest: UpdateTripsRequest
  ): Promise<Trip> {
    const trip = await this.tripModel
      .findByIdAndUpdate(id, updateTripsRequest, { new: true })
      .exec();
    if (!trip) {
      throw new NotFoundException(`Trip with ID ${id} not found`);
    }
    return trip;
  }

  async deleteTrip(id: string): Promise<void> {
    const result = await this.tripModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Trip with ID ${id} not found`);
    }
  }

  async findTripsByUser(userId: string): Promise<Trip[]> {
    return this.tripModel.find({ user: userId }).exec();
  }
}
