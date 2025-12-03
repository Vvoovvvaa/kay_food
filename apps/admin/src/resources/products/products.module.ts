import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { ProductsController } from './products.controller';
import { Category,MediaFiles,User,Product,Ingredient, Language, ProductTranslation } from '../../../../../libs/common/src/database/entities';
import { ProductsService } from './products.service';
import { AdminsModule } from '../admins/admins.module';
import { S3Module } from '@app/common/s3/s3.module';



@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports:[TypeOrmModule.forFeature([Category,User,MediaFiles,Product,Ingredient,Language,ProductTranslation]),AdminsModule,S3Module]
})
export class ProductsModule {}
