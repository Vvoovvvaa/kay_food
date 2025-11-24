import { Controller, Post, Body, UseGuards} from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ChechkCodeDto } from './dto/check-code.dto';
import { AuthGuard } from '@app/common/guards';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post()
  async Login (@Body() body:CreateAuthDto){
    return this.authService.loginOrRegister(body)
  }
  @UseGuards(AuthGuard)
  @Post('login')
  async loginAndRegister(@Body() body:ChechkCodeDto){
    return this.authService.authenfication(body)
  }
  
}