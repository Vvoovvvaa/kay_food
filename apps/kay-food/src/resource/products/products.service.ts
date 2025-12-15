import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';


import { Product} from '../../../../../libs/common/src/database/entities';
import { Repository } from 'typeorm';



@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  async findAll(lang:string) {
    const product = await this.productRepository.find({ relations: ['translation','translation.language', 'mediaFiles'] })

    return  product.map(p => ({
      ...p,
      translation: p.translation.find(t => t.language.name === lang)

    }))
  }

  async findOne(id: number, lang: string) {
    const product = await this.productRepository.findOne({ where: { id }, relations: ['translation', 'translation.language','mediaFiles'] })

    if (!product) {
      throw new NotFoundException('product not found')
    }

    return {
      ...product,
      translation: product.translation.find(t => t.language.name === lang)
    }
  }


}
