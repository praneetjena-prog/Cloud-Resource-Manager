import { Controller, Get, Query } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Controller("api/credits")
export class CreditsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getTransactions(
    @Query("userId") userId: string,
    @Query("limit") limit: string = "50"
  ) {
    return this.prisma.creditTransaction.findMany({
      where: userId ? { userId } : undefined,
      orderBy: { createdAt: "desc" },
      take: parseInt(limit, 10),
      include: { resource: { select: { name: true, type: true } } },
    });
  }

  @Get("balance")
  async getBalance(@Query("userId") userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { creditBalance: true },
    });
    return { balance: user?.creditBalance ?? 0 };
  }
}
