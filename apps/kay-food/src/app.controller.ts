import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    return;
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    console.log('OAuth user:', req.user);
    return this.appService.oauthLogin(req);
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth() {
    return;
  }

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuthRedirect(@Req() req) {
    console.log('OAuth user:', req.user);
    const loginResult = await this.appService.oauthLogin(req);
    return loginResult;
  }

}