import { Injectable } from "@nestjs/common";
import { prisma, FormType } from "@orgsites/db";

@Injectable()
export class FormsService {
  /** Public form submission from a rendered site's contact_form / volunteer block. */
  async submit(siteId: string, formType: FormType, payload: Record<string, unknown>) {
    return prisma.formSubmission.create({
      data: { siteId, formType, payload: payload as any },
    });
  }

  async listForSite(siteId: string, formType?: FormType) {
    return prisma.formSubmission.findMany({
      where: { siteId, ...(formType ? { formType } : {}) },
      orderBy: { createdAt: "desc" },
    });
  }

  /** Backs the "Submissions dashboard with CSV export" feature (spec §5.5). */
  async exportCsv(siteId: string, formType?: FormType): Promise<string> {
    const submissions = await this.listForSite(siteId, formType);
    if (submissions.length === 0) return "";

    const fieldNames = Array.from(
      new Set(
        submissions.flatMap((submission) => {
          const payload = (submission.payload || {}) as Record<string, any>;
          return Object.keys(payload);
        })
      )
    );
    const header = ["createdAt", "formType", ...fieldNames].join(",");
    const rows = submissions.map((submission) => {
      const payload = (submission.payload || {}) as Record<string, any>;
      const cells = [
        submission.createdAt.toISOString(),
        submission.formType,
        ...fieldNames.map((fieldName) => JSON.stringify(payload[fieldName] ?? "")),
      ];
      return cells.join(",");
    });

    return [header, ...rows].join("\n");
  }
}
