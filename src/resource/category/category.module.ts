import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { User,Category,MediaFiles } from '../../entities';
import { AuthModule } from '../auth/auth.module';
import { CategoryController } from './category.controller';
import { CategoriesService } from './category.service';


@Module({
  controllers: [CategoryController],
  providers: [CategoriesService],
  imports:[TypeOrmModule.forFeature([Category,User,MediaFiles]),AuthModule]
})
export class CategoryModule {}
