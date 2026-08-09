import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { OrgsService } from "./orgs.service";
import type { OrgType } from "@orgsites/db";

class CreateOrgDto {
  name!: string;
  type!: OrgType;
}

@Controller("orgs")
export class OrgsController {
  constructor(private readonly orgsService: OrgsService) {}

  @Post()
  create(@Body() body: CreateOrgDto) {
    return this.orgsService.create(body);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.orgsService.findById(id);
  }
}
