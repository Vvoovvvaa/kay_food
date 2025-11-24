import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';


import { OrdersService } from './orders.service';
import { OrderDto } from './dto/create-order-dto';
import { AuthUser } from '../../../../../libs/common/src/decorators/auth-user.decorator';
import { AuthGuard} from '../../../../../libs/common/src/guards'

@UseGuards(AuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  async addOrder(@Body() dto: OrderDto, @AuthUser() user: any) {
    return this.ordersService.create(dto, user.id);
  }

  @Get('my')
  async getMyOrders(@AuthUser() user: any) {
    return this.ordersService.findMyOrders(user.id);
  }

}