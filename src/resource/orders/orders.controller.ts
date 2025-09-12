import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from 'src/guards/auth-guard';
import { Roles, RolesGuard } from 'src/guards/role-guard';
import { OrderDto } from './dto/create-order-dto';
import { UserRole } from 'src/entities/enums/role.enum';
import { IdDto } from 'src/dto/id-param.dto';
import { AuthUser } from 'src/decorators/auth-user.decorator';

@UseGuards(AuthGuard,RolesGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Roles(UserRole.ADMIN)
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Roles(UserRole.ADMIN,UserRole.USER)
  @Post()
  async addOrder(@Body() dto: OrderDto, @AuthUser() user: any) {
    return this.ordersService.create(dto, user.id);
  }

  @Get('my')
  async getMyOrders(@AuthUser() user: any) {
    return this.ordersService.getMyOrders(user.id);
  }
  
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async deleteOrder(@Param() param: IdDto) {
    return this.ordersService.removeOrder(param.id);
  }

}