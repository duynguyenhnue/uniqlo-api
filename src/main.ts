import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import "./mongoose-extensions";
import { ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from "./api/auth/jwt/jwt-auth.gaurd";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(process.env.PORT || 8000);
}
bootstrap();
