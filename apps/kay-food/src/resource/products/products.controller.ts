import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { ProductsService } from './products.service';
import { IdDto } from '../../../../../libs/common/src/dto/id-param.dto';
import { AuthGuard} from '../../../../../libs/common/src/guards'
import { GetLang } from '@app/common/decorators/get-lang.decorator';
import { string } from 'joi';



@UseGuards(AuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  async allProducts(@GetLang() lang:string) {
    return this.productsService.findAll(lang)
  }

  @Get(':id')
  async findOne(@Param() param: IdDto,@GetLang() lang:string){
    return this.productsService.findOne(param.id,lang)
  }

}

