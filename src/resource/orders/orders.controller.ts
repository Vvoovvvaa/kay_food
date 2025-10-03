import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';


import { OrdersService } from './orders.service';
import { OrderDto } from './dto/create-order-dto';
import { IdDto } from 'src/dto/id-param.dto';
import { AuthUser } from 'src/decorators/auth-user.decorator';
import { UserRole } from 'src/entities/enums/role.enum';
import { Roles, RolesGuard,AuthGuard} from '../../guards'

@UseGuards(AuthGuard, RolesGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Roles(UserRole.ADMIN)
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Roles(UserRole.ADMIN, UserRole.USER)
  @Post()
  async addOrder(@Body() dto: OrderDto, @AuthUser() user: any) {
    return this.ordersService.create(dto, user.id);
  }

  @Get('my')
  async getMyOrders(@AuthUser() user: any) {
    return this.ordersService.findMyOrders(user.id);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async deleteOrder(@Param() param: IdDto) {
    return this.ordersService.removeOrder(param.id);
  }

}