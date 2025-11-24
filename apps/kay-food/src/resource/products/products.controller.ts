import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { ProductsService } from './products.service';
import { IdDto } from '../../../../../libs/common/src/dto/id-param.dto';
import { AuthGuard} from '../../../../../libs/common/src/guards'



@UseGuards(AuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  async allProducts() {
    return this.productsService.findAll()
  }

  @Get(':id')
  async findOne(@Param() param: IdDto){
    return this.productsService.findOne(param.id)
  }

}

