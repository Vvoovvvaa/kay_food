import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';


import { Product,MediaFiles,Category,Ingredient } from '../../../../../libs/common/src/database/entities';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { ingrediendDTO } from './dto/ingredient.dto';
import {FileHelper,PhotoValidator} from '../../../../../libs/common/src/helpers'


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
    private readonly ingredientsRepository:Repository<Ingredient>
  ) { }


  async createProduct(productDto: CreateProductDto, files: Express.Multer.File[]) {
    const nameCheck = await this.productRepository.findOne({ where: { productName: productDto.productName } })
    const idCheck = await this.categoryRepository.findOne({ where: { id: productDto.categoryId } })

    if (nameCheck) {
      throw new ConflictException('this product name are exists,please rename')
    } if (!idCheck) {
      throw new NotFoundException('category not found,please try again')
    }
    const photoEntities: MediaFiles[] = []

    if (files) {
      for (let file of files) {
        const validated = PhotoValidator.validator(file);
        const photoEntity = this.mediaRepository.create({
          path: FileHelper.saveFile(validated, 'products'),
          size: validated.size
        })
        await this.mediaRepository.save(photoEntities)
        photoEntities.push(photoEntity)

      }
  
    }

    const product = this.productRepository.create({
        productName: productDto.productName,
        description: productDto.description,
        weight: productDto.weight,
        price: productDto.price,
        category: idCheck,     
        mediaFiles: photoEntities 
    });
    await this.productRepository.save(product)
    return product

  }

  async findAll(){
    return await this.productRepository.find()
  }

  async findOne(id:number){
    const product = await this.productRepository.findOne({where:{id}})

    if(!product){
      throw new NotFoundException('product not found')
    }

    return product
  }

  async updateProduct(id:number,updateDto:UpdateProductDto,files:Express.Multer.File[]){
    const product = await this.productRepository.findOne({where:{id},relations:["mediaFiles"]})
    
    if(!product){
      throw new NotFoundException('Category not found')
    }

    product.productName = updateDto.productName ?? product.productName
    product.description = updateDto.description ?? product.description
    product.weight = updateDto.weight ?? product.weight
    product.price = updateDto.price ?? product.price
    

      if(files) {
      for (let file of files) {
        const validated = PhotoValidator.validator(file);
        const photoEntity = this.mediaRepository.create({
          path: FileHelper.saveFile(validated, 'products'),
          size: validated.size
        })
        product.mediaFiles.push(photoEntity)
      }
    }
    return this.productRepository.save(product)


  }


  async removeProduct(id:number){
    const findProduct = await this.productRepository.findOne({where:{id}})

    if(!findProduct){
      throw new NotFoundException('Not found this product')
    }

    await this.productRepository.remove(findProduct)
    return{message:"product are succes deleted"}
  }

  async addIngredients(dto:ingrediendDTO){
    const existing = await this.ingredientsRepository.findOne({where:{name:dto.name}})
    if(existing){
      throw new ConflictException('this Ingredient are existing,please rename')
    }

    const ingredients = await this.ingredientsRepository.create({
      name:dto.name,
      price:dto.price
    })
    
    await this.ingredientsRepository.save(ingredients)
    return ingredients
  }


}
