import { forwardRef, Module } from '@nestjs/common';
import { DestinationService } from './destination.service';
import { DestinationController } from './destination.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Destination, DestinationSchema } from 'src/payload/schema/destination.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Destination.name, schema: DestinationSchema }]),
    forwardRef(() => AuthModule),
  ],
  controllers: [DestinationController],
  providers: [DestinationService],
  exports: [DestinationService],
})
export class DestinationModule {}
