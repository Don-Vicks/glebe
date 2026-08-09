import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { BullModule } from "@nestjs/bullmq";
import { AuthModule } from "./modules/auth/auth.module";
import { OrgsModule } from "./modules/orgs/orgs.module";
import { SitesModule } from "./modules/sites/sites.module";
import { PagesModule } from "./modules/pages/pages.module";
import { DonationsModule } from "./modules/donations/donations.module";
import { FormsModule } from "./modules/forms/forms.module";
import { PaymentsModule } from "./modules/payments/payments.module";
import { QueuesModule } from "./queues/queues.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // Root BullMQ connection — individual queues are registered in
    // QueuesModule (spec §8.7: site-build, domain-verification, payments,
    // media, email).
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST ?? "localhost",
        port: Number(process.env.REDIS_PORT ?? 6379),
      },
    }),
    AuthModule,
    OrgsModule,
    SitesModule,
    PagesModule,
    DonationsModule,
    FormsModule,
    PaymentsModule,
    QueuesModule,
  ],
})
export class AppModule {}
