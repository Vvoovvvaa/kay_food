import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';


import { UserRole } from 'src/entities/enums/role.enum';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { ingrediendDTO } from './dto/ingredient-DTO';
import { IdDto } from 'src/dto/id-param.dto';
import { Roles, RolesGuard,AuthGuard} from '../../guards'



@UseGuards(AuthGuard, RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }


  @Roles(UserRole.ADMIN)
  @Post('create')
  @UseInterceptors(FilesInterceptor('photos'))
  async create(
    @Body() dto: CreateProductDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    return this.productsService.createProduct(dto, files || []);
  }


  @Roles(UserRole.USER,UserRole.ADMIN)
  @Get()
  async allProducts() {
    return this.productsService.findAll()
  }

  @Roles(UserRole.ADMIN, UserRole.USER)
  @Patch(":id")
  @UseInterceptors(FilesInterceptor('photos'))
  async updateCategory(
    @Body() dto: UpdateProductDto,
    @Param() param: IdDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    return this.productsService.updateProduct(param.id, dto, files || [])
  }


  @Roles(UserRole.ADMIN)
  @Delete(":id")
  async deleteProduct(@Param() param: IdDto){
    return this.productsService.removeProduct(param.id)
  }

  @Roles(UserRole.USER,UserRole.ADMIN)
  @Get(':id')
  async findOne(@Param() param: IdDto){
    return this.productsService.findOne(param.id)
  }

  @Roles(UserRole.ADMIN,UserRole.USER)
  @Post('add/ing') 
  async createIngredients(@Body() body:ingrediendDTO){
    return this.productsService.addIngredients(body)
  }

}

