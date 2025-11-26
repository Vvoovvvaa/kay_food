import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { User,Category,MediaFiles, Language } from '../../../../../libs/common/src/database/entities';
import { AuthModule } from 'apps/kay-food/src/resource/auth/auth.module';
import { CategoryController } from './category.controller';
import { CategoriesService } from './category.service';
import { CategoryTranslation } from '@app/common/database/entities/category-translation';


@Module({
  controllers: [CategoryController],
  providers: [CategoriesService],
  imports:[TypeOrmModule.forFeature([Category,User,MediaFiles,CategoryTranslation,Language]),AuthModule]
})
export class CategoryModule {}
