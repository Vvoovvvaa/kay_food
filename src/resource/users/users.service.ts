import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { UpdateUserDto } from './dto/update-user.dto';
import { User,MediaFiles, Product } from '../../entities';
import { ChangeRoleDTO } from './dto/change-role.dto';
import {FileHelper,PhotoValidator} from '../../helpers'

@Injectable()
export class UsersService {
  productRepository: any;


  constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>,
    @InjectRepository(MediaFiles)
    private readonly mediarepository:Repository<MediaFiles>
  ) { }


  async updateUsersData(id: number, dto: UpdateUserDto, files?: Express.Multer.File[]) {
    const user = await this.userRepository.findOne({ where: { id },relations:['mediaFiles'] });
    if (!user) {
      throw new NotFoundException('user not found')
    };

    user.firstName = dto.firstName ?? user.firstName;
    user.lastName = dto.lastName ?? user.lastName;
    user.age = dto.age ?? user.age;

    if (files) {
      for (let file of files) {
        const validated = PhotoValidator.validator(file);
        const photoEntity = this.mediarepository.create({
          path: FileHelper.saveFile(validated, 'user'),
          size: validated.size
        })
        user.mediaFiles.push(photoEntity)
      }
    }

    return this.userRepository.save(user)
  }

  async findAll(){
    return this.userRepository.find()
  }

  async removeUser(id:number){
    const user = await this.userRepository.findOne({where:{id}})

    if(!user){
      throw new NotFoundException('User not found')
    }

    await this.userRepository.remove(user)
    return {message:`user are deleted`}

  }

  async findOne(id:number){
    const findUser = await this.userRepository.findOne({where:{id}})

    if(!findUser){
      throw new NotFoundException('User not found,please try again')
    }
    return findUser

  }

  async changeRoles(id:number,dto:ChangeRoleDTO){
    const user = await this.userRepository.findOne({where:{id}})
    if(!user){
      throw new NotFoundException('User not found')
    }
    user.role = dto.role
    return this.userRepository.save(user)
  }

   async addFavorite(userId: number, productId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });
    if (!user) throw new NotFoundException('User not found');

    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) throw new NotFoundException('Product not found');

    if (user.favorites.find((e) => e.id === product.id)) {
      return user;
    }
    user.favorites.push(product);
    return await this.userRepository.save(user);

  }

  async getFavorites(userId: number): Promise<Product[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });

    if (user && user.favorites) {
      return user.favorites;
    } else {
      return [];
    }

  }

  async removeFavorite(userId: number, productId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });
    if (!user) {
      throw new NotFoundException('User not found')
    };

    user.favorites = user.favorites.filter((e) => e.id !== productId);

    return await this.userRepository.save(user);
  }



}
