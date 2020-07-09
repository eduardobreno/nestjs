import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './modules/auth/local-auth.guard';
import { AuthService } from './modules/auth/auth.service';

@Controller("/v1/auth")
export class AppController {
  constructor(private authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: { user: { id: string } }): Promise<{ access_token: string }> {
    return this.authService.login(req.user);
  }

}