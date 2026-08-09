import { Injectable, UnauthorizedException } from "@nestjs/common";
import { prisma } from "@orgsites/db";

/**
 * Auth is intentionally minimal here — this is a scaffold, not a security
 * review. Before this touches real user data:
 *   1. Hash passwords with argon2/bcrypt (never store plaintext).
 *   2. Sign a real JWT (jsonwebtoken or @nestjs/jwt) with an expiry.
 *   3. Add a refresh-token flow and httpOnly cookie storage.
 *   4. Rate-limit login attempts.
 */
@Injectable()
export class AuthService {
  async validateLogin(email: string, _password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    // TODO: compare _password against user.passwordHash with argon2/bcrypt.

    return {
      userId: user.id,
      organizationId: user.organizationId,
      role: user.role,
    };
  }
}
