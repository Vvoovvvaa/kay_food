import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User,Category,MediaFiles,Product } from '../../../../../libs/common/src/database/entities';

import { AdminsModule } from '../admins/admins.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, User, MediaFiles, Product]),
    AdminsModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
