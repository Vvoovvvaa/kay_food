import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/category';
import { MediaFiles } from 'src/entities/media-files';
import { User } from 'src/entities/user';

@Module({
  imports:[TypeOrmModule.forFeature([Category,User,MediaFiles])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
