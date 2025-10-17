import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AdminService } from './admins.service';
import { CreateAdminDto } from './dto/admin-create.dto';
import { AdminLogDto } from './dto/admin-login.dto';
import { AdminAuthGuard } from '@app/common/guards/admin-auth-guard';

@UseGuards(AdminAuthGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async addAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.addAdmin(createAdminDto);
  }

  @Post('login')
  async adminLogin(@Body() login:AdminLogDto){
    return this.adminLogin(login)
  }

  @Get()
  async findAll(){
    return this.findAll()
  }

}