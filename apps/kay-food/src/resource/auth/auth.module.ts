import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../../../libs/common/src/database/entities'
import { SecretCode } from '../../../../../libs/common/src/database/entities';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[
    TypeOrmModule.forFeature([User,SecretCode]),
    JwtModule.register({
      global:true,
      secret:process.env.JWT_SECRET,
      signOptions:{expiresIn:'10m'}
    }),
    JwtModule.register({
      global:false,
      secret:process.env.JWT_SECRET1,
      signOptions:{expiresIn:'1d'}
    })

    
  ]
})
export class AuthModule {}
