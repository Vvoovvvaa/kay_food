import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/guards/auth-guard';
import { Roles, RolesGuard } from 'src/guards/role-guard';
import { UserRole } from 'src/entities/enums/role.enum';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ingrediendDTO } from './dto/ingredient-DTO';



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
    @Param('id') id: number,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    return this.productsService.updateProduct(id, dto, files || [])
  }


  @Roles(UserRole.ADMIN)
  @Delete(":id")
  async deleteProduct(@Param('id') id:number){
    return this.productsService.removeProduct(id)
  }

  @Roles(UserRole.USER,UserRole.ADMIN)
  @Get(':id')
  async findOne(@Param('id') id:number){
    return this.productsService.findOne(id)
  }

  @Roles(UserRole.ADMIN,UserRole.USER)
  @Post('add/ing') 
  async createIngredients(@Body() body:ingrediendDTO){
    return this.productsService.addIngredients(body)
  }

}

