import { Body, Controller, Post, Res } from "@nestjs/common";
import type { Response } from "express";
import { AuthService } from "./auth.service";
import { signSessionToken } from "@orgsites/trpc";

class LoginDto {
  email!: string;
  password!: string;
}

class SignupDto {
  email!: string;
  password!: string;
  organizationName!: string;
  name?: string;
}

const ACCESS_TOKEN_COOKIE = "orgsites_session";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() body: LoginDto, @Res({ passthrough: true }) res: Response) {
    const session = await this.authService.validateLogin(body.email, body.password);
    const token = signSessionToken(session, 60 * 60 * 24 * 7);
    setAuthCookie(res, token);
    return { userId: session.userId, organizationId: session.organizationId, role: session.role };
  }

  @Post("signup")
  async signup(@Body() body: SignupDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.signup(body);
    const token = signSessionToken(result.session, 60 * 60 * 24 * 7);
    setAuthCookie(res, token);
    return {
      user: {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name,
        role: result.user.role,
      },
      organization: result.organization,
    };
  }
}

function setAuthCookie(res: Response, token: string) {
  res.cookie(ACCESS_TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
}
