import { Controller, Get,UseGuards } from '@nestjs/common';


import { CategoriesService } from './category.service';
import { AuthGuard,} from '../../../../../libs/common/src/guards';
import { GetLang } from '@app/common/decorators/get-lang.decorator';


@UseGuards(AuthGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Get()
  async all(@GetLang() lang:string){
    return this.categoryService.findAll(lang)
  }
}