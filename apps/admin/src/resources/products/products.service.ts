import { Product, MediaFiles, Category, Ingredient, Language, ProductTranslation } from "@app/common/database/entities";
import { ProductLanguage } from "@app/common/database/enums";
import { PhotoValidator, FileHelper } from "@app/common/helpers";
import { Injectable, ConflictException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { ingrediendDTO } from "./dto/ingredient.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(MediaFiles)
    private readonly mediaRepository: Repository<MediaFiles>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    @InjectRepository(Ingredient)
    private readonly ingredientsRepository: Repository<Ingredient>,

    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,

    @InjectRepository(ProductTranslation)
    private readonly productTranslation: Repository<ProductTranslation>,
  ) { }

  async create(dto: CreateProductDto, files?: Express.Multer.File[]) {
    const existEnName = await this.productTranslation.findOne({
      where: {
        productName: dto.productNameEn,
        language: { name: ProductLanguage.ENGLISH },
      },
      relations: ['language'],
    });
    if (existEnName) throw new ConflictException('Product name EN already exists');

    const category = await this.categoryRepository.findOne({ where: { id: dto.categoryId } });
    if (!category) throw new NotFoundException('Category not found');

    const photoEntities: MediaFiles[] = [];
    if (files?.length) {
      for (const file of files) {
        const validated = PhotoValidator.validator(file);
        const photoEntity = this.mediaRepository.create({
          path: FileHelper.saveFile(validated, 'products'),
          size: validated.size,
        });
        const savedPhoto = await this.mediaRepository.save(photoEntity);
        photoEntities.push(savedPhoto);
      }
    }

    const product = this.productRepository.create({
      weight: dto.weight,
      price: dto.price,
      category: category,
      mediaFiles: photoEntities,
    });
    await this.productRepository.save(product);

    const [langEn, langRu, langAm] = await Promise.all([
      this.languageRepository.findOne({ where: { name: ProductLanguage.ENGLISH } }),
      this.languageRepository.findOne({ where: { name: ProductLanguage.RUSSIAN } }),
      this.languageRepository.findOne({ where: { name: ProductLanguage.ARMENIA } }),
    ]);
    if (!langEn || !langRu || !langAm) throw new NotFoundException('Language records missing in DB');

    const translations = [
      { product, language: langEn, productName: dto.productNameEn, description: dto.descriptionEn },
      { product, language: langRu, productName: dto.productNameRu, description: dto.descriptionRu },
      { product, language: langAm, productName: dto.productNameAm, description: dto.descriptionAm },
    ].map(t => this.productTranslation.create(t));

    await this.productTranslation.save(translations);

    return this.productRepository.findOne({
      where: { id: product.id },
      relations: ['translation', 'mediaFiles', 'category'],
    });
  }

  async updateProductData(id: number, updateDto: UpdateProductDto, files?: Express.Multer.File[],) {

    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['mediaFiles', 'translation', 'translation.language'],
    });
    if (!product) throw new NotFoundException('Product not found');

    let translations = product.translation;

    if (!translations || translations.length === 0) {
      const [langEn, langRu, langAm] = await Promise.all([
        this.languageRepository.findOne({ where: { name: ProductLanguage.ENGLISH } }),
        this.languageRepository.findOne({ where: { name: ProductLanguage.RUSSIAN } }),
        this.languageRepository.findOne({ where: { name: ProductLanguage.ARMENIA } }),
      ]);
      if (!langEn || !langRu || !langAm)
        throw new NotFoundException('Language records missing in DB');

      translations = [
        {
          product,
          language: langEn,
          productName: updateDto.productNameEn,
          description: updateDto.descriptionEn,
        },
        {
          product,
          language: langRu,
          productName: updateDto.productNameRu,
          description: updateDto.descriptionRu,
        },
        {
          product,
          language: langAm,
          productName: updateDto.productNameAm,
          description: updateDto.descriptionAm,
        },
      ].map(t => this.productTranslation.create(t));
    } else {
      for (const tr of translations) {
        switch (tr.language.name) {
          case ProductLanguage.ENGLISH:
            tr.productName = updateDto.productNameEn || tr.productName;
            tr.description = updateDto.descriptionEn || tr.description;
            break;
          case ProductLanguage.RUSSIAN:
            tr.productName = updateDto.productNameRu || tr.productName;
            tr.description = updateDto.descriptionRu || tr.description;
            break;
          case ProductLanguage.ARMENIA:
            tr.productName = updateDto.productNameAm || tr.productName;
            tr.description = updateDto.descriptionAm || tr.description;
            break;
        }
      }
    }

    await this.productTranslation.save(translations);

    product.weight = updateDto.weight ?? product.weight;
    product.price = updateDto.price ?? product.price;

    if (updateDto.categoryId) {
      const newCategory = await this.categoryRepository.findOne({ where: { id: updateDto.categoryId } });
      if (!newCategory) throw new NotFoundException('Category not found');
      product.category = newCategory;
    }

    if (files?.length) {
      for (const file of files) {
        const validated = PhotoValidator.validator(file);
        const photo = this.mediaRepository.create({
          path: FileHelper.saveFile(validated, 'products'),
          size: validated.size,
        });
        const savedPhoto = await this.mediaRepository.save(photo);
        product.mediaFiles.push(savedPhoto);
      }
    }

    return this.productRepository.save(product);
  }


  async findAll() {
    return this.productRepository.find({ relations: ['translation', 'mediaFiles', 'category'] });
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({ where: { id }, relations: ['translation', 'mediaFiles', 'category'] });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async removeProduct(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    await this.productRepository.remove(product);
    return { message: 'Product successfully deleted' };
  }

  async addIngredients(dto: ingrediendDTO) {
    const existing = await this.ingredientsRepository.findOne({ where: { name: dto.name } });
    if (existing) throw new ConflictException('Ingredient already exists');

    const ingredient = this.ingredientsRepository.create({ name: dto.name, price: dto.price });
    return this.ingredientsRepository.save(ingredient);
  }
}
