import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { DestinationService } from './destination.service';
import { Destination } from 'src/payload/schema/destination.schema';
import { CreateDestinationRequest, UpdateDestinationRequest } from 'src/payload/request/destination.request';

@Controller('destinations')
export class DestinationController {
  constructor(private readonly destinationService: DestinationService) {}

  @Post()
  async createDestination(@Body() createDestinationRequest: CreateDestinationRequest): Promise<Destination> {
    return this.destinationService.createDestination(createDestinationRequest);
  }

  @Get(':id')
  async getDestination(@Param('id') id: string): Promise<Destination> {
    return this.destinationService.findDestinationById(id);
  }

  @Put(':id')
  async updateDestination(@Param('id') id: string, @Body() updateDestinationRequest: UpdateDestinationRequest): Promise<Destination> {
    return this.destinationService.updateDestination(id, updateDestinationRequest);
  }

  @Delete(':id')
  async deleteDestination(@Param('id') id: string): Promise<void> {
    return this.destinationService.deleteDestination(id);
  }

  @Get('trip/:tripId')
  async getDestinationsByTrip(@Param('tripId') tripId: string): Promise<Destination[]> {
    return this.destinationService.findDestinationsByTrip(tripId);
  }
}
