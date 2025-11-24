import { Admins } from '@app/common/database/entities/admins';
import { Ijwtconfig } from '@app/common/models';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/admin-create.dto';
import { AdminLogDto } from './dto/admin-login.dto';
import { IAutehenticationResponse } from './models/authentication-response';
import * as bcrypt from "bcrypt";
import { ConfigService } from '@nestjs/config';
import { accauntStatus } from '@app/common/database/enums';
import { AdminSecurity } from '@app/common/database/entities/admin-security';

@Injectable()
export class AdminService {
  jwtConfig: Ijwtconfig;

  constructor(
    @InjectRepository(Admins)
    private readonly adminRepo: Repository<Admins>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(AdminSecurity)
    private readonly adminRepository: Repository<AdminSecurity>
  ) {
    this.jwtConfig = this.configService.get("JWT_CONFIG") as Ijwtconfig;
  }

async createAdmin(dto: CreateAdminDto): Promise<IAutehenticationResponse> {

  const existingByName = await this.adminRepo.findOne({ where: { name:dto.name } });
  if (existingByName) {
    throw new BadRequestException('Admin with this name already exists');
  }

  const existingByEmail = await this.adminRepo.findOne({ where: { email:dto.email } });
  if (existingByEmail) {
    throw new BadRequestException('Admin with this email already exists');
  }

  const admin = this.adminRepo.create({
    name:dto.name,
    email:dto.email,
    password: await bcrypt.hash(dto.password, 12),
  });

  if(admin.accountStatus === accauntStatus.PERMANETLY_BLOCK){
    throw new BadRequestException("Youre account  blocoked all time")
  }
  
  if(admin.accountStatus === accauntStatus.TEMPORARY_BLOCK){
    throw new BadRequestException("Youre account blocked")
  }

  const savedAdmin = await this.adminRepo.save(admin);

  const security = this.adminRepository.create({
    admin:savedAdmin,
    temporaryBlock: 0,
    permanetlyBlock: false,
    totalLoginAttemps: 0,
    temporaryBlockUntil: null,
  });

  await this.adminRepository.save(security);

  const accessToken = this.jwtService.sign(
    { sub: savedAdmin.id, name: savedAdmin.name },
    { secret: this.jwtConfig.admin_secret1, expiresIn: '1d' }
  );

  return {
    accessToken,
    message: 'Admin successfully created and authorized',
  };
}


async adminLogin(dto: AdminLogDto): Promise<IAutehenticationResponse> {
  const { name, password } = dto;

  const admin = await this.adminRepo.findOne({
    where: { name },
    relations: ['security']
  });

  if (!admin) throw new BadRequestException('Invalid admin credentials');

  const now = new Date();

  if (admin.accountStatus === accauntStatus.PERMANETLY_BLOCK) {
    throw new BadRequestException("Your account is permanently blocked");
  }

  if (admin.accountStatus === accauntStatus.TEMPORARY_BLOCK && admin.security.temporaryBlockUntil) {
    if (now < admin.security.temporaryBlockUntil) {
      const minutesLeft = Math.ceil(
        (admin.security.temporaryBlockUntil.getTime() - now.getTime()) / 60000
      );
      throw new BadRequestException(`Your account is temporarily blocked. Try again in ${minutesLeft} minute(s)`);
    } else {
      admin.accountStatus = accauntStatus.ACTIVE;
      admin.security.temporaryBlockUntil = null;
      await this.adminRepository.save(admin.security);
      await this.adminRepo.save(admin);
    }
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);

  if (!isPasswordValid) {
    admin.security.totalLoginAttemps += 1;

    if (admin.security.totalLoginAttemps >= 3) {
      admin.security.totalLoginAttemps = 0;
      admin.security.temporaryBlock += 1;

      admin.security.temporaryBlockUntil = new Date(Date.now() + 10 * 1000); 
      admin.accountStatus = accauntStatus.TEMPORARY_BLOCK;

      if (admin.security.temporaryBlock >= 3) {
        admin.accountStatus = accauntStatus.PERMANETLY_BLOCK;
        admin.security.permanetlyBlock = true
      }

      await this.adminRepository.save(admin.security);
      await this.adminRepo.save(admin);

      const message = admin.accountStatus === accauntStatus.PERMANETLY_BLOCK
        ? "Your account is permanently blocked"
        : "Your account is temporarily blocked for 15 minutes";

      throw new BadRequestException(message);
    }

    await this.adminRepository.save(admin.security);
    throw new BadRequestException("Invalid password or login");
  }

  admin.security.totalLoginAttemps = 0;
  admin.security.temporaryBlockUntil = null;
  admin.accountStatus = accauntStatus.ACTIVE;

  await this.adminRepository.save(admin.security);
  await this.adminRepo.save(admin);

  const accessToken = this.jwtService.sign(
    { sub: admin.id, name: admin.name },
    { secret: this.jwtConfig.admin_secret1, expiresIn: '1d' }
  );

  return {
    accessToken,
    message: "Admin successfully authenticated",
  };
}

  

  async findAll() {
    return this.adminRepo.find({ select: ["id", "name", "email", "createdAt"] });
  }
}
