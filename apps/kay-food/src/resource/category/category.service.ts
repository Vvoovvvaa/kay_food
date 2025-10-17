import { Injectable,} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category} from '../../../../../libs/common/src/database/entities';


@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) { }

  async findAll() {
    return await this.categoryRepository.find()
  }

}



