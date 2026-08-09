import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { prisma } from "@orgsites/db";

/**
 * Thin NestJS wrapper around the shared PrismaClient singleton from
 * @orgsites/db, so it can be injected into services with the framework's
 * lifecycle hooks rather than imported as a bare module-level constant.
 */
@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  readonly client = prisma;

  async onModuleInit() {
    await this.client.$connect();
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
  }
}
