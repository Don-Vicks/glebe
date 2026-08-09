import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

class LoginDto {
  email!: string;
  password!: string;
}

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() body: LoginDto) {
    const session = await this.authService.validateLogin(body.email, body.password);
    // TODO: sign a real JWT here and set it as an httpOnly cookie instead
    // of returning session fields directly.
    return session;
  }
}
