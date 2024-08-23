import { forwardRef, Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Photo, PhotoSchema } from 'src/payload/schema/photo.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Photo.name, schema: PhotoSchema }]),
    forwardRef(() => AuthModule),
  ],
  controllers: [PhotoController],
  providers: [PhotoService],
  exports: [PhotoService]
})
export class PhotoModule {}
