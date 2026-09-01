import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";

async function bootstrap() {
  // rawBody: true is required for payments webhook signature verification
  // (PaystackProvider/StripeProvider hash the raw, unparsed request body).
  const app = await NestFactory.create(AppModule, { cors: true, rawBody: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors({
    origin: [process.env.BUILDER_ORIGIN ?? "http://localhost:3000"],
    credentials: true,
  });
  app.setGlobalPrefix("v1"); // e.g. /v1/donations/webhook/paystack
  const port = process.env.API_PORT ?? 4000;
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`OrgSites API (Platform API, spec §8.2) listening on :${port}`);
}

bootstrap();
