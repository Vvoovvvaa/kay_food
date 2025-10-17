import { Controller, Post, Body} from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ChechkCodeDto } from './dto/check-code.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post()
  async Login (@Body() body:CreateAuthDto){
    return this.authService.loginOrRegister(body)
  }

  @Post('login')
  async loginAndRegister(@Body() body:ChechkCodeDto){
    return this.authService.authenfication(body)
  }
  
}