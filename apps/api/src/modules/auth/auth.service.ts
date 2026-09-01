import { Injectable, BadRequestException, UnauthorizedException } from "@nestjs/common";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { prisma } from "@orgsites/db";
import { verifySessionToken, type AuthedSession } from "@orgsites/trpc";

@Injectable()
export class AuthService {
  async validateLogin(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email: normalizeEmail(email) } });
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
    const email = normalizeEmail(input.email);
    if (input.password.length < 10) {
      throw new BadRequestException("Password must be at least 10 characters.");
    }
    if (input.organizationName.trim().length < 2) {
      throw new BadRequestException("Organization name must be at least 2 characters.");
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
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
          email,
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

  async getSession(token: string | undefined): Promise<AuthedSession | null> {
    if (!token) return null;
    const session = verifySessionToken(token);
    if (!session) return null;

    const user = await prisma.user.findFirst({
      where: { id: session.userId, organizationId: session.organizationId },
      select: { id: true, organizationId: true, role: true },
    });
    if (!user) return null;

    return { userId: user.id, organizationId: user.organizationId, role: user.role };
  }
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
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
