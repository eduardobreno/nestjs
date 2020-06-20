import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './modules/auth/local-auth.guard';
import { AuthService } from './modules/auth/auth.service';
import { UserPayload } from './modules/users/payloads/user.payload';

@Controller("/v1/auth")
export class AppController {
  constructor(private authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: { user: UserPayload }): Promise<{ access_token: string }> {
    return this.authService.login(req.user);
  }

}