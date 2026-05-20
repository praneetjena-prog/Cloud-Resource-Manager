import { Controller, Get, Post, Patch, Body, Param, Query } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Controller("api/resources")
export class ResourcesController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getResources(@Query("userId") userId: string) {
    return this.prisma.cloudResource.findMany({
      where: userId ? { userId } : undefined,
      orderBy: { createdAt: "desc" },
    });
  }

  @Post()
  async provisionResource(
    @Body() body: { userId: string; name: string; type: string; region: string; spec: any; costPerHour: number }
  ) {
    return this.prisma.cloudResource.create({
      data: {
        userId: body.userId,
        name: body.name,
        type: body.type as any,
        region: body.region,
        spec: body.spec,
        costPerHour: body.costPerHour,
        status: "PROVISIONING",
      },
    });
  }

  @Patch(":id/start")
  async startResource(@Param("id") id: string) {
    return this.prisma.cloudResource.update({
      where: { id },
      data: { status: "RUNNING", lastStartedAt: new Date() },
    });
  }

  @Patch(":id/stop")
  async stopResource(@Param("id") id: string) {
    return this.prisma.cloudResource.update({
      where: { id },
      data: { status: "STOPPED", lastStoppedAt: new Date() },
    });
  }
}
