import { Controller, Post, Body, UseGuards} from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ChechkCodeDto } from './dto/check-code.dto';
import { AuthGuard } from '@app/common/guards';
import { AuthUser } from '@app/common/decorators/auth-user.decorator';
import type { IRequestUser } from '../users/models/request-user';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post()
  async Login (@Body() body:CreateAuthDto){
    return this.authService.loginOrRegister(body)
  }
  @UseGuards(AuthGuard)
  @Post('login')
  async loginAndRegister(@AuthUser() user:IRequestUser,@Body() body:ChechkCodeDto){
    return this.authService.authenfication(body,user.id)
  }
  
}