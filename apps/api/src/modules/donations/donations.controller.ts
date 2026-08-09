import { Controller, Get, Param } from "@nestjs/common";
import { DonationsService } from "./donations.service";

@Controller("donations")
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Get(":siteId/summary")
  summary(@Param("siteId") siteId: string) {
    return this.donationsService.summaryForSite(siteId);
  }
}
