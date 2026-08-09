import { Injectable, NotFoundException } from "@nestjs/common";
import { prisma } from "@orgsites/db";

@Injectable()
export class PagesService {
  async findPublished(siteId: string, slug: string) {
    const page = await prisma.page.findUnique({
      where: { siteId_slug: { siteId, slug } },
    });
    if (!page || page.isDraft) throw new NotFoundException("Page not found");
    return page;
  }
}
