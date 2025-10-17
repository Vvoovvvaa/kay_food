import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { ProductsController } from './products.controller';
import { Product} from '../../../../../libs/common/src/database/entities';
import { ProductsService } from './products.service';
import { AuthModule } from '../auth/auth.module';



@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports:[TypeOrmModule.forFeature([Product]),AuthModule]
})
export class ProductsModule {}
