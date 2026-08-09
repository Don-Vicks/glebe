import { Body, Controller, Get, Param, Post, Query, Res } from "@nestjs/common";
import type { Response } from "express";
import { FormsService } from "./forms.service";
import type { FormType } from "@orgsites/db";

class SubmitFormDto {
  formType!: FormType;
  payload!: Record<string, unknown>;
}

@Controller("forms")
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post(":siteId/submit")
  submit(@Param("siteId") siteId: string, @Body() body: SubmitFormDto) {
    return this.formsService.submit(siteId, body.formType, body.payload);
  }

  @Get(":siteId")
  list(@Param("siteId") siteId: string, @Query("formType") formType?: FormType) {
    return this.formsService.listForSite(siteId, formType);
  }

  @Get(":siteId/export.csv")
  async exportCsv(@Param("siteId") siteId: string, @Res() res: Response, @Query("formType") formType?: FormType) {
    const csv = await this.formsService.exportCsv(siteId, formType);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename="submissions-${siteId}.csv"`);
    res.send(csv);
  }
}
