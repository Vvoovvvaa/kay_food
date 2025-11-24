import { Module } from '@nestjs/common';
import { AdminController } from './admins.controller';
import { AdminService } from './admins.service';
import { Admins } from '@app/common/database/entities/admins';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserSecurity } from '@app/common/database/entities';
import { AdminSecurity } from '@app/common/database/entities/admin-security';

@Module({
  controllers: [AdminController],
  providers: [AdminService,ConfigService],
  imports:[
    TypeOrmModule.forFeature([Admins,UserSecurity,AdminSecurity]),
    JwtModule.register({
      global:true,
      secret:process.env.JWT_ADMIN_SECRET,
      signOptions:{expiresIn:'1d'}
    }),ConfigModule
    ]
})
export class AdminsModule {
    
}
