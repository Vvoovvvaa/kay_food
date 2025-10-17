import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { ProductsController } from './products.controller';
import { Category,MediaFiles,User,Product,Ingredient } from '../../../../../libs/common/src/database/entities';
import { ProductsService } from './products.service';
import { AdminsModule } from '../admins/admins.module';



@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports:[TypeOrmModule.forFeature([Category,User,MediaFiles,Product,Ingredient]),AdminsModule]
})
export class ProductsModule {}
