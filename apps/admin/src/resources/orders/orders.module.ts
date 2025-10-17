import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';


import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Ingredient,Product,Order,OrderItem, Zone, User } from '../../../../../libs/common/src/database/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Product, OrderItem,Ingredient,Zone,User]),
    JwtModule.register({})
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}