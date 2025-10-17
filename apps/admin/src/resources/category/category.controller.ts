import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { FileInterceptor} from '@nestjs/platform-express';  


import { CategoriesService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dtp';
import { IdDto } from '../../../../../libs/common/src/dto/id-param.dto';
import { AdminAuthGuard } from '@app/common/guards/admin-auth-guard';


@UseGuards(AdminAuthGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Get()
  async all(){
    return this.categoryService.findAll()
  }

  @Post('add')
  @UseInterceptors(FileInterceptor('photo'))
  async addCategory(
    @Body() dto: CreateCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.categoryService.createCategory(dto, file);
  }

  @Patch(":id")
  @UseInterceptors(FileInterceptor('photo'))
  async updateCategory(
    @Body() dto:UpdateCategoryDto,
    @Param() param: IdDto,
    @UploadedFile() file: Express.Multer.File,
  ) { 
    return this.categoryService.updateCategory(param.id,dto,file)
  }

  @Delete(':id')
  async deleteCategory(@Param() param: IdDto){
    return this.categoryService.deleteCategory(param.id)
  }
}