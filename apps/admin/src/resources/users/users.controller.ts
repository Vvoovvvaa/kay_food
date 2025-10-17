import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';


import { OwnerCheckGuard} from '../../../../../libs/common/src/guards';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { IdDto } from '../../../../../libs/common/src/dto/id-param.dto';
import { AuthUser } from '../../../../../libs/common/src/decorators/auth-user.decorator';
import type { IRequestUser } from './models/request-user';
import { AdminAuthGuard } from '@app/common/guards/admin-auth-guard';



@UseGuards(AdminAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(OwnerCheckGuard)
  @Patch(":id")
  @UseInterceptors(FilesInterceptor('photos'))
  async updateUser(
    @Body() dto:UpdateUserDto,
    @Param('id') id:number,
    @UploadedFiles() files?: Express.Multer.File[],
  ) { 
    return this.usersService.updateUsersData(id,dto,files)
  }

  @Get(':id')
  async findOneUser(@Param() param: IdDto){
    return this.usersService.findOne(param.id)
  }

  @Get()
  async allUsers(){
    return this.usersService.findAll()
  }

  @Delete(':id')
  async deleteUser(@Param() param: IdDto){
    return this.usersService.removeUser(param.id)
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
