import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UploadedFile, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/guards/auth-guard';
import { Roles, RolesGuard } from 'src/guards/role-guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UserRole } from 'src/entities/enums/role.enum';
import { OwnerCheckGuard } from 'src/guards/owner-chechk-guard';


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
  async findOneUser(@Param('id') id :number){
    return this.usersService.findOne(id)
  }


  @Roles(UserRole.ADMIN,UserRole.USER)
  @Get()
  async allUsers(){
    return this.usersService.findAll()
  }


  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async deleteUser(@Param("id") id:number){
    return this.usersService.removeUser(id)
  }

  @Roles(UserRole.ADMIN)
  @Post(':id')
  async addAdmin(@Param('id') id:number){
    return this.usersService.addAdmin(id)
  }


  @Roles(UserRole.ADMIN)
  @Post('admin/:id')
  async removeAdmin(@Param('id') id:number){
    return this.usersService.removeAdmin(id)
  }



}
