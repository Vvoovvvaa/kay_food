import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/category';
import { MediaFiles } from 'src/entities/media-files';
import { User } from 'src/entities/user';
import { AuthModule } from '../auth/auth.module';
import { Product } from 'src/entities/product';
import { Ingredient } from 'src/entities/ingredients';


@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports:[TypeOrmModule.forFeature([Category,User,MediaFiles,Product,Ingredient]),AuthModule]
})
export class ProductsModule {}
