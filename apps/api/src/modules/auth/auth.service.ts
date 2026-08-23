import { Injectable, BadRequestException, UnauthorizedException } from "@nestjs/common";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { prisma } from "@orgsites/db";

@Injectable()
export class AuthService {
  async validateLogin(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) {
      throw new UnauthorizedException("Invalid credentials");
    }

    if (!verifyPassword(password, user.passwordHash)) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return {
      userId: user.id,
      organizationId: user.organizationId,
      role: user.role,
    };
  }

  async signup(input: { email: string; password: string; organizationName: string; name?: string | null }) {
    const existingUser = await prisma.user.findUnique({ where: { email: input.email } });
    if (existingUser) {
      throw new BadRequestException("An account with that email already exists.");
    }

    const passwordHash = hashPassword(input.password);

    const result = await prisma.$transaction(async (tx) => {
      const organization = await tx.organization.create({
        data: {
          name: input.organizationName,
        },
      });

      const user = await tx.user.create({
        data: {
          email: input.email,
          name: input.name ?? null,
          passwordHash,
          role: "OWNER",
          organizationId: organization.id,
        },
      });

      return { user, organization };
    });

    return {
      session: {
        userId: result.user.id,
        organizationId: result.organization.id,
        role: result.user.role,
      },
      user: result.user,
      organization: result.organization,
    };
  }
}

function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derived = scryptSync(password, salt, 64).toString("hex");
  return `scrypt$${salt}$${derived}`;
}

function verifyPassword(password: string, storedHash: string) {
  const [scheme, salt, expectedHex] = storedHash.split("$");
  if (scheme !== "scrypt" || !salt || !expectedHex) return false;
  const actual = scryptSync(password, salt, Buffer.from(expectedHex, "hex").length);
  const expected = Buffer.from(expectedHex, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
