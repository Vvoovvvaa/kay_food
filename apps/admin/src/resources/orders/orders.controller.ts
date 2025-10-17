import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';


import { OrdersService } from './orders.service';
import { OrderDto } from './dto/create-order.dto';
import { IdDto } from '../../../../../libs/common/src/dto/id-param.dto';
import { AuthUser } from '../../../../../libs/common/src/decorators/auth-user.decorator';
import { AdminAuthGuard } from '@app/common/guards/admin-auth-guard';

@UseGuards(AdminAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Post()
  async addOrder(@Body() dto: OrderDto, @AuthUser() user: any) {
    return this.ordersService.create(dto, user.id);
  }

  @Get('my')
  async getMyOrders(@AuthUser() user: any) {
    return this.ordersService.findMyOrders(user.id);
  }

  @Delete(':id')
  async deleteOrder(@Param() param: IdDto) {
    return this.ordersService.removeOrder(param.id);
  }

}