import { Module } from '@nestjs/common';
import { AdminController } from './admins.controller';
import { AdminService } from './admins.service';
import { Admins } from '@app/common/database/entities/admins';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports:[
    TypeOrmModule.forFeature([Admins]),
    JwtModule.register({
      global:true,
      secret:process.env.JWT_ADMIN_SECRET,
      signOptions:{expiresIn:'1d'}
    }),
    ]
})
export class AdminsModule {
    
}
