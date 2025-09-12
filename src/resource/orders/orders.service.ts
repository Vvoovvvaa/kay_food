import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Order } from 'src/entities/order';
import { Product } from 'src/entities/product';
import { User } from 'src/entities/user';
import { OrderItem } from 'src/entities/order-item';
import { OrderDto } from './dto/create-order-dto';
import { Ingredient } from 'src/entities/ingredients';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) { }

  
async create(orderDto: OrderDto, user: User): Promise<Order> {
  const order = this.orderRepository.create({
    user,
    totalPrice: 0,
    items: [],
  });

  let totalPrice = 0;

  for (const item of orderDto.items) {
    const product = await this.productRepository.findOne({
      where: { id: item.productId },
    });
    if (!product) {
      throw new NotFoundException(`Product ${item.productId} not found`);
    }

    let ingredients: Ingredient[] = [];
    if (item.ingredientIds) {
      ingredients = await this.ingredientRepository.findBy({
        id: In(item.ingredientIds),
      });

      if (ingredients.length !== item.ingredientIds.length) {
        throw new NotFoundException('One or more ingredients not found');
      }
    }

    const productPrice = Number(product.price);
    if (isNaN(productPrice)) {
      throw new BadRequestException('product Value error');
    }

    const ingredientCost = ingredients.reduce((sum, ing) => {
      const val = Number(ing.price);
      if (isNaN(val)) {
        throw new BadRequestException('product value error');
      }
      return sum + val;
    }, 0);

    const itemPrice = (productPrice + ingredientCost) * item.quantity;

    const orderItem = this.orderItemRepository.create({
      product,
      quantity: item.quantity,
      ingredients: ingredients,
      price: itemPrice,
    });

    order.items.push(orderItem);
    totalPrice += itemPrice;
  }

  order.totalPrice = totalPrice;

  return await this.orderRepository.save(order);
}


  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find({
      relations: ['user', 'items', 'items.product', 'items.ingredients'],
    });
  }

  async getMyOrders(user: User): Promise<Order[]> {
    return await this.orderRepository.find({
      where: { user: { id: user.id } }
    });
  }


  async removeOrder(id: number){
    const findOrder = await this.orderRepository.findOne({ where: { id } });
    if (!findOrder) {
      throw new NotFoundException(`Order ${id} not found`);
    }
    await this.orderRepository.remove(findOrder);
    return {message:"Order deleted successfully"}
  }
}