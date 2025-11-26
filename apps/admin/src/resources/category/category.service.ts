import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category, Language, MediaFiles } from '../../../../../libs/common/src/database/entities';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FileHelper, PhotoValidator } from '../../../../../libs/common/src/helpers'
import { UpdateCategoryDto } from './dto/update-category.dtp';
import { CategoryTranslation } from '@app/common/database/entities/category-translation';
import { Languages } from '@app/common/database/enums';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(MediaFiles)
    private readonly mediaRepository: Repository<MediaFiles>,
    @InjectRepository(CategoryTranslation)
    private readonly categoryTranslateRepo: Repository<CategoryTranslation>,
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>
  ) { }

  async createCategory(dto: CreateCategoryDto, file?: Express.Multer.File) {

    let parent: Category | undefined;

    const parentId = dto.parentId

    if (parentId) {
      const found = await this.categoryRepository.findOne({ where: { id: parentId } });
      if (!found) {
        throw new NotFoundException('Parent category not found')
      }
      parent = found
    }

    const existing = await this.categoryTranslateRepo.findOne({
      where: {
        name: dto.categoryNameEn,
        language: { name: Languages.ENGLISH }
      },
      relations: ['language']
    })

    if (existing) {
      throw new ConflictException('category name already exists')
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

    if (existing) {
      throw new ConflictException('Category name already existing !')
    }

    const category = this.categoryRepository.create({
      parent,
      mediaFiles: photoEntities
    })

    await this.categoryRepository.save(category)

    const [langEn, langRu, langAm] = await Promise.all([
      this.languageRepository.findOne({ where: { name: Languages.ENGLISH } }),
      this.languageRepository.findOne({ where: { name: Languages.RUSSIAN } }),
      this.languageRepository.findOne({ where: { name: Languages.ARMENIA } }),]);

    if (!langEn || !langRu || !langAm) {
      throw new NotFoundException('Language records missing in DB');
    }

    const translationData = [
      {
        name: dto.categoryNameEn,
        description: dto.descriptionEn,
        category,
        language: langEn,
      },
      {
        name: dto.categoryNameRu,
        description: dto.descriptionRu,
        category,
        language: langRu,
      },
      {
        name: dto.categoryNameAm,
        description: dto.descriptionAm,
        category,
        language: langAm,
      },
    ];

    const translations = translationData.map(t =>
      this.categoryTranslateRepo.create(t),
    );
    await this.categoryTranslateRepo.save(translations)

    return await this.categoryRepository.findOne({
      where: { id: category.id },
      relations: [
        'translations',
        'translations.language',
        'mediaFiles',
        'parent',
        'children',
      ],
    });

  }


  async updateCategory(id: number, dto: UpdateCategoryDto, file?: Express.Multer.File) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: [
        'translations',
        'translations.language',
        'mediaFiles',
        'parent',
        'children',
      ],
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (file) {
      const validated = PhotoValidator.validator(file);
      const photoEntity = this.mediaRepository.create({
        path: FileHelper.saveFile(validated, 'category'),
        size: validated.size,
      });

      const savedPhoto = await this.mediaRepository.save(photoEntity);
      category.mediaFiles = [savedPhoto];
    }

    for (const tr of category.translations) {
      switch (tr.language.name) {
        case Languages.ENGLISH:
          tr.name = dto.categoryNameEn ?? tr.name;
          tr.description = dto.descriptionEn ?? tr.description;
          break;
        case Languages.RUSSIAN:
          tr.name = dto.categoryNameRu ?? tr.name;
          tr.description = dto.descriptionRu ?? tr.description;
          break;
        case Languages.ARMENIA:
          tr.name = dto.categoryNameAm ?? tr.name;
          tr.description = dto.descriptionAm ?? tr.description;
          break;
      }
    }

    await this.categoryTranslateRepo.save(category.translations);
    return this.categoryRepository.save(category)

  }


  findAll() {
    return this.categoryRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async deleteCategory(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    await this.categoryRepository.remove(category);
    return { message: 'Category removed successfully' };
  }


}



