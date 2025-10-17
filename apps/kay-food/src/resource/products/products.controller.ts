import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';


import { UserRole } from '../../../../../libs/common/src/database/entities/enums/role.enum';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { ingrediendDTO } from './dto/ingredient-DTO';
import { IdDto } from '../../../../../libs/common/src/dto/id-param.dto';
import { Roles, RolesGuard,AuthGuard} from '../../../../../libs/common/src/guards'



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

