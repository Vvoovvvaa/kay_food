import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';


import { AuthGuard,RolesGuard,OwnerCheckGuard,Roles } from '../../guards';
import { UsersService } from './users.service';
import { UserRole } from 'src/entities/enums/role.enum';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangeRoleDTO } from './dto/change-role.dto';
import { IdDto } from 'src/dto/id-param.dto';
import { AuthUser } from 'src/decorators/auth-user.decorator';
import type { IRequestUser } from './models/request-user';



@UseGuards(AuthGuard,RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(OwnerCheckGuard)
  @Roles(UserRole.ADMIN,UserRole.USER)
  @Patch(":id")
  @UseInterceptors(FilesInterceptor('photos'))
  async updateUser(
    @Body() dto:UpdateUserDto,
    @Param('id') id:number,
    @UploadedFiles() files?: Express.Multer.File[],
  ) { 
    return this.usersService.updateUsersData(id,dto,files)
  }

  @Roles(UserRole.ADMIN,UserRole.USER)
  @Get(':id')
  async findOneUser(@Param() param: IdDto){
    return this.usersService.findOne(param.id)
  }


  @Roles(UserRole.ADMIN,UserRole.USER)
  @Get()
  async allUsers(){
    return this.usersService.findAll()
  }


  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async deleteUser(@Param() param: IdDto){
    return this.usersService.removeUser(param.id)
  }

  @Roles(UserRole.ADMIN)
  @Post(':id')
  async addAdmin(@Param() param: IdDto,@Body() dto:ChangeRoleDTO){
    return this.usersService.changeRoles(param.id,dto)
  }

  @Post('favorites/:id')
  async addFavorite(
    @AuthUser() user: IRequestUser,
    @Param() param: IdDto,   
  ) {
    return this.usersService.addFavorite(user.id, param.id);
  }

  @Get('favorites')
  async getFavorites(@AuthUser() user: IRequestUser) {
    return this.usersService.getFavorites(user.id);
  }

  @Delete('favorites/:id')
  async removeFavorite(
    @AuthUser() user: IRequestUser,
    @Param() param: IdDto,
  ) {
    return this.usersService.removeFavorite(user.id, param.id);
  }



}
