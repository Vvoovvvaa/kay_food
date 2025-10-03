import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { ProductsController } from './products.controller';
import { Category,MediaFiles,User,Product,Ingredient } from '../../entities';
import { ProductsService } from './products.service';
import { AuthModule } from '../auth/auth.module';



@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports:[TypeOrmModule.forFeature([Category,User,MediaFiles,Product,Ingredient]),AuthModule]
})
export class ProductsModule {}
