import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PhotoValidator } from 'src/helpers/photos-validation-helper.';
import { MediaFiles } from 'src/entities/media-files';
import { FileHelper } from 'src/helpers/file-helper';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(MediaFiles)
    private readonly mediaRepository: Repository<MediaFiles>
  ) { }

  async createCategory(dto: CreateCategoryDto, file?: Express.Multer.File) {
  let parent: Category | undefined;
  if (dto.parentId) {
    const parentCheck = await this.categoryRepository.findOne({ where: { id: dto.parentId } });
    if (!parentCheck) {
      throw new NotFoundException('Parent category not found');
    }
    parent = parentCheck;
  }
  
  const nameCheck = await this.categoryRepository.findOne({
    where: { categoryName: dto.categoryName },
  });
  if (nameCheck) {
    throw new ConflictException('Category name already exists, please rename');
  }

  const photoEntities: MediaFiles[] = [];
  if (file) {
    const validated = PhotoValidator.validator(file);
    const photoEntity = this.mediaRepository.create({
      path: FileHelper.saveFile(validated, 'category'),
      size: validated.size,
    });

    const savedPhoto = await this.mediaRepository.save(photoEntity);
    photoEntities.push(savedPhoto);
  }

  const category = this.categoryRepository.create({
    categoryName: dto.categoryName,
    description: dto.description,
    parent,
    mediaFiles: photoEntities,
  });

  await this.categoryRepository.save(category);
  return category;
}



  async updateCategory(id: number, dto: UpdateCategoryDto, file?: Express.Multer.File) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    category.categoryName = dto.categoryName ?? category.categoryName;
    category.description = dto.description ?? category.description;

    if (file) {
      const validated = PhotoValidator.validator(file);
      const photoEntity = this.mediaRepository.create({
        path: FileHelper.saveFile(validated, 'category'),
        size: validated.size
      });

      const savedPhoto = await this.mediaRepository.save(photoEntity);
      category.mediaFiles = [savedPhoto];
    }

    return this.categoryRepository.save(category);
  }



  async findAll() {
    return await this.categoryRepository.find()
  }

  


  async deleteCategory(id:number){
    const category = await this.categoryRepository.findOne({where:{id}})
    if(!category){
      throw new NotFoundException('Category not found,try again')
    }
    await this.categoryRepository.remove(category)
    return {message: 'Category removed succesfully'}

  }

}



