import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { FileInterceptor} from '@nestjs/platform-express';  


import { CategoriesService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AuthGuard,Roles,RolesGuard } from '../../guards';
import { UserRole } from 'src/entities/enums/role.enum';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { IdDto } from 'src/dto/id-param.dto';


@UseGuards(AuthGuard,RolesGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Get()
  async all(){
    return this.categoryService.findAll()
  }

  @Roles(UserRole.ADMIN)
  @Post('add')
  @UseInterceptors(FileInterceptor('photo'))
  async addCategory(
    @Body() dto: CreateCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.categoryService.createCategory(dto, file);
  }

  @Roles(UserRole.ADMIN)
  @Patch(":id")
  @UseInterceptors(FileInterceptor('photo'))
  async updateCategory(
    @Body() dto:UpdateCategoryDto,
    @Param() param: IdDto,
    @UploadedFile() file: Express.Multer.File,
  ) { 
    return this.categoryService.updateCategory(param.id,dto,file)
  }


  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async deleteCategory(@Param() param: IdDto){
    return this.categoryService.deleteCategory(param.id)
  }
}