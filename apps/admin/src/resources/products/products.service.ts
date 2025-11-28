import { Product, MediaFiles, Category, Ingredient, Language, ProductTranslation } from "@app/common/database/entities";
import { Languages } from "@app/common/database/enums";
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

  async createProduct(dto: CreateProductDto, files?: Express.Multer.File[]) {
    const existEnName = await this.productTranslation.findOne({
      where: {
        productName: dto.productNameEn,
        language: { name: Languages.ENGLISH },
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
      this.languageRepository.findOne({ where: { name: Languages.ENGLISH } }),
      this.languageRepository.findOne({ where: { name: Languages.RUSSIAN } }),
      this.languageRepository.findOne({ where: { name: Languages.ARMENIA } }),
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
        this.languageRepository.findOne({ where: { name: Languages.ENGLISH } }),
        this.languageRepository.findOne({ where: { name: Languages.RUSSIAN } }),
        this.languageRepository.findOne({ where: { name: Languages.ARMENIA } }),
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
          case Languages.ENGLISH:
            tr.productName = updateDto.productNameEn || tr.productName;
            tr.description = updateDto.descriptionEn || tr.description;
            break;
          case Languages.RUSSIAN:
            tr.productName = updateDto.productNameRu || tr.productName;
            tr.description = updateDto.descriptionRu || tr.description;
            break;
          case Languages.ARMENIA:
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

  async addIngredient(dto: ingrediendDTO) {
    const langEn = await this.languageRepository.findOne({ where: { name: Languages.ENGLISH } });
    const langRu = await this.languageRepository.findOne({ where: { name: Languages.RUSSIAN } });
    const langAm = await this.languageRepository.findOne({ where: { name: Languages.ARMENIA } });

    if (!langEn || !langRu || !langAm) {
      throw new NotFoundException("Languages not found in DB");
    }

    const exists = await this.ingredientsRepository.findOne({
      where: {
        name: dto.nameEn,
        language: { id: langEn.id },
      },
      relations: ["language"],
    });

    if (exists) {
      throw new ConflictException("Ingredient already exists");
    }

    const list = [
      { name: dto.nameEn, price: dto.price, language: langEn },
      { name: dto.nameRu, price: dto.price, language: langRu },
      { name: dto.nameAm, price: dto.price, language: langAm },
    ].map(item => this.ingredientsRepository.create(item));

    return this.ingredientsRepository.save(list);
  }

  async removeIngredient(id: number) {
    const ingredient = await this.ingredientsRepository.findOne({ where: { id } });
    if (!ingredient) throw new NotFoundException("Ingredient not found");

    await this.ingredientsRepository.remove(ingredient);

    return { message: "Ingredient successfully deleted" };
  }

  async allIngredients(){
    return this.ingredientsRepository.find({relations:['language']})
  }
}


