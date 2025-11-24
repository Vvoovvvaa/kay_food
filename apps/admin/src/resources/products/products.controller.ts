import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { ingrediendDTO } from './dto/ingredient.dto';
import { IdDto } from '../../../../../libs/common/src/dto/id-param.dto';
import { AdminAuthGuard } from '@app/common/guards/admin-auth-guard';

@UseGuards(AdminAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  @UseInterceptors(FilesInterceptor('photos'))
  async create(
    @Body() dto: CreateProductDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    return this.productsService.create(dto, files || []);
  }

  @Get()
  async allProducts() {
    return this.productsService.findAll();
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('photos'))
  async updateProduct(
    @Param() param: IdDto,
    @Body() dto: UpdateProductDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    return this.productsService.updateProductData(param.id, dto, files || []);
  }

  @Delete(':id')
  async deleteProduct(@Param() param: IdDto) {
    return this.productsService.removeProduct(param.id);
  }

  @Get(':id')
  async findOne(@Param() param: IdDto) {
    return this.productsService.findOne(param.id);
  }

  @Post('add/ing')
  async createIngredients(@Body() body: ingrediendDTO) {
    return this.productsService.addIngredients(body);
  }
}
