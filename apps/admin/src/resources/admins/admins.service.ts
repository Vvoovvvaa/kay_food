import { Admins } from '@app/common/database/entities/admins';
import { Ijwtconfig } from '@app/common/models';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/admin-create.dto';
import { AdminLogDto } from './dto/admin-login.dto';
import { IAutehenticationResponse } from './models/authentication-response';
import {bcrypt} from "bcrypt"

@Injectable()
export class AdminService {
  jwtConfig: Ijwtconfig;
  constructor(
    @InjectRepository(Admins)
    private readonly adminRepo: Repository<Admins>,
    private readonly jwtService: JwtService,
  ) { }

  async addAdmin(createAdmin: CreateAdminDto): Promise<Admins> {

    const existing = await this.adminRepo.findOne({ where: { name: createAdmin.adminName } })
    if (existing) {
      throw new BadRequestException('Admin with this name already exists')
    }

    const admin = await this.adminRepo.create({
      name: createAdmin.adminName,
      email: createAdmin.email,
      password: await bcrypt.hash(createAdmin.password, 12)
    })
    return this.adminRepo.save(admin)
  }

  async adminLogin(login: AdminLogDto): Promise<IAutehenticationResponse> {
    const admin = await this.adminRepo.findOne({ where: { name: login.name } })

    if (!admin) {
      throw new BadRequestException('Invalid admin credentials')
    }

    const isPasswordValid = await bcrypt.compare(login.password, admin.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid admin credentials')
    }

    const accessToken = this.jwtService.sign(
      { sub: admin.id, name: admin.name }, {
      secret: this.jwtConfig.admin_secret,
      expiresIn: '1d',
    });
    return {
      accessToken,
      message: 'Authentication successful'
    };
  }

  findAll() {
    return this.adminRepo.find();
  }
}
