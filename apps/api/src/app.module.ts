import { Module } from "@nestjs/common";
import { CreditsController } from "./credits/credits.controller";
import { ResourcesController } from "./resources/resources.controller";
import { PrismaService } from "./prisma.service";

@Module({
  controllers: [CreditsController, ResourcesController],
  providers: [PrismaService],
})
export class AppModule {}
