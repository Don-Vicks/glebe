import { Injectable, NotFoundException } from "@nestjs/common";
import { prisma, OrgType } from "@orgsites/db";

@Injectable()
export class OrgsService {
  async create(input: { name: string; type: OrgType }) {
    return prisma.organization.create({ data: input });
  }

  async findById(id: string) {
    const org = await prisma.organization.findUnique({ where: { id } });
    if (!org) throw new NotFoundException("Organization not found");
    return org;
  }
}
