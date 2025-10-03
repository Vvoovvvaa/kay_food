import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User,Category,MediaFiles, Zone, Product } from '../../entities';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, User, MediaFiles, Product]),
    AuthModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
