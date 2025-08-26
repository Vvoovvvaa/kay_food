import { Module } from '@nestjs/common';
import { CategoriesService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/category';
import { User } from 'src/entities/user';
import { AuthModule } from '../auth/auth.module';
import { MediaFiles } from 'src/entities/media-files';

@Module({
  controllers: [CategoryController],
  providers: [CategoriesService],
  imports:[TypeOrmModule.forFeature([Category,User,MediaFiles]),AuthModule]
})
export class CategoryModule {}
