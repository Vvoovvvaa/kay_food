import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { User,Category,MediaFiles } from '../../../../../libs/common/src/database/entities';
import { AuthModule } from 'apps/kay-food/src/resource/auth/auth.module';
import { CategoryController } from './category.controller';
import { CategoriesService } from './category.service';


@Module({
  controllers: [CategoryController],
  providers: [CategoriesService],
  imports:[TypeOrmModule.forFeature([Category,User,MediaFiles]),AuthModule]
})
export class CategoryModule {}
