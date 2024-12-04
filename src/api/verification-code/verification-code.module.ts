import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VerificationCodeService } from './verification-code.service';
import { VerificationCodeController } from './verification-code.controller';
import { VerificationCode, VerificationCodeSchema } from 'src/schema/verificationCode.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: VerificationCode.name, schema: VerificationCodeSchema }]),
    ],
    providers: [VerificationCodeService],
    controllers: [VerificationCodeController],
    exports: [VerificationCodeService, MongooseModule],
})
export class VerificationCodeModule { }