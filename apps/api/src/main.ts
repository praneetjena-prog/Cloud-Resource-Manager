import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

let cachedServer: any;

async function bootstrapServerless() {
  if (!cachedServer) {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
      origin: true,
      credentials: true,
    });
    await app.init();
    cachedServer = app.getHttpAdapter().getInstance();
  }
  return cachedServer;
}

// Default export is the serverless request handler Vercel expects
export default async (req: any, res: any) => {
  const server = await bootstrapServerless();
  return server(req, res);
};

// Start standalone server when running locally or on Docker/GCP
if (!process.env.VERCEL) {
  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
      origin: true,
      credentials: true,
    });
    const port = process.env.PORT || 4000;
    await app.listen(port);
  }
  bootstrap();
}

