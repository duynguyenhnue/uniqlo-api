import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDestinationRequest, UpdateDestinationRequest } from 'src/payload/request/destination.request';
import { Destination } from 'src/payload/schema/destination.schema';

@Injectable()
export class DestinationService {
  constructor(@InjectModel(Destination.name) private readonly destinationModel: Model<Destination>) {}

  async createDestination(createDestinationRequest: CreateDestinationRequest): Promise<Destination> {
    const createdDestination = new this.destinationModel(createDestinationRequest);
    return createdDestination.save();
  }

  async findDestinationById(id: string): Promise<Destination> {
    const destination = await this.destinationModel.findById(id).exec();
    if (!destination) {
      throw new NotFoundException(`Destination with ID ${id} not found`);
    }
    return destination;
  }

  async updateDestination(id: string, updateDestinationRequest: UpdateDestinationRequest): Promise<Destination> {
    const destination = await this.destinationModel.findByIdAndUpdate(id, updateDestinationRequest, { new: true }).exec();
    if (!destination) {
      throw new NotFoundException(`Destination with ID ${id} not found`);
    }
    return destination;
  }

  async deleteDestination(id: string): Promise<void> {
    const result = await this.destinationModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Destination with ID ${id} not found`);
    }
  }

  async findDestinationsByTrip(tripId: string): Promise<Destination[]> {
    return this.destinationModel.find({ trip: tripId }).exec();
  }
}
