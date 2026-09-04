import { Body, Controller, Param, Post } from "@nestjs/common";
import { SitesService } from "./sites.service";

class RequestDomainDto {
  domain!: string;
}

@Controller("sites")
export class SitesController {
  constructor(private readonly sitesService: SitesService) {}

  @Post(":id/publish")
  /** Publish API surface — enqueues the edge rebuild for the site. */
  publish(@Param("id") id: string) {
    return this.sitesService.publish(id);
  }

  @Post(":id/domain")
  requestDomain(@Param("id") id: string, @Body() body: RequestDomainDto) {
    return this.sitesService.requestCustomDomain(id, body.domain);
  }
}
