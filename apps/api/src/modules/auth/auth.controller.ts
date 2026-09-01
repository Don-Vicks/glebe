import { Body, Controller, Get, Headers, Post, Res } from "@nestjs/common";
import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";
import type { Response } from "express";
import { AuthService } from "./auth.service";
import { signSessionToken } from "@orgsites/trpc";

class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(10)
  password!: string;
}

class SignupDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(10)
  password!: string;

  @IsString()
  @MinLength(2)
  organizationName!: string;

  @IsOptional()
  @IsString()
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

  @Get("me")
  async me(@Headers("cookie") cookieHeader?: string) {
    const session = await this.authService.getSession(readCookie(cookieHeader, ACCESS_TOKEN_COOKIE));
    if (!session) return { authenticated: false };
    return { authenticated: true, session };
  }

  @Post("logout")
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(ACCESS_TOKEN_COOKIE, { httpOnly: true, sameSite: "lax", path: "/" });
    return { success: true };
  }
}

function readCookie(header: string | undefined, name: string) {
  return header
    ?.split(";")
    .map((part) => part.trim().split("="))
    .find(([key]) => key === name)?.[1];
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
