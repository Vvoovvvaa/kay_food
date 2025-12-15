import { Injectable,} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category} from '../../../../../libs/common/src/database/entities';


@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(lang:string) {
    const category = await this.categoryRepository.find({ relations: ['translations','translations.language', 'mediaFiles'] })

    return  category.map(p => ({
      ...p,
      translations: p.translations.find(t => t.language.name === lang)

    }))
  }
}



