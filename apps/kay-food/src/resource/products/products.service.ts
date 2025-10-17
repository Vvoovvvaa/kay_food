import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';


import { Product } from '../../../../../libs/common/src/database/entities';

import { Repository } from 'typeorm';



@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  async findAll() {
    return await this.productRepository.find()
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({ where: { id } })

    if (!product) {
      throw new NotFoundException('product not found')
    }

    return product
  }


}
