import { Controller, Get, Param, Query } from "@nestjs/common";
import { PagesService } from "./pages.service";

@Controller("pages")
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Get(":siteId")
  findOne(@Param("siteId") siteId: string, @Query("slug") slug = "/") {
    return this.pagesService.findPublished(siteId, slug);
  }
}
