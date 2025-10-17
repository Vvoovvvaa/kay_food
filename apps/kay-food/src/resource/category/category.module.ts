import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { Category } from '../../../../../libs/common/src/database/entities';
import { AuthModule } from '../auth/auth.module';
import { CategoryController } from './category.controller';
import { CategoriesService } from './category.service';


@Module({
  controllers: [CategoryController],
  providers: [CategoriesService],
  imports:[TypeOrmModule.forFeature([Category]),AuthModule]
})
export class CategoryModule {}
