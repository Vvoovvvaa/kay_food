import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { User,SecretCode } from '../../entities';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ChechkCodeDto } from './dto/check-code.dto';
import { IAuthenticationResponse } from './models/authentication-response';
import { randomCode } from '../../helpers';
import { UserRole } from 'src/entities/enums/role.enum';
import { Ijwtconfig } from 'src/models';
import { ConfigService } from '@nestjs/config';



@Injectable()
export class AuthService {
  private jwtconfig:Ijwtconfig
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(SecretCode)
    private readonly secretRepository: Repository<SecretCode>,
    private jwtservice: JwtService,
    private readonly configService:ConfigService
    
  ) {
    this.jwtconfig = this.configService.get("JWT_CONFIG" ) as Ijwtconfig
   }

  async loginOrRegister(dto: CreateAuthDto): Promise<IAuthenticationResponse> {
    const { phone } = dto
    let user = await this.userRepository.findOne({ where: { phone } });

    if (!user) {
      user = this.userRepository.create({ phone });
      await this.userRepository.save(user);
    }

    const existing = await this.secretRepository.findOne({ where: { user: { id: user.id } } });
    if (existing) {
      await this.secretRepository.delete({ id: existing.id });
    }

    const secretCode = this.secretRepository.create({
      code: randomCode().toString(),
      user,
    });
    await this.secretRepository.save(secretCode);

    const payload = { sub: user.id, phone: user.phone,role:UserRole};

    return {
      accessToken: this.jwtservice.sign(payload, { secret: this.jwtconfig.secret }),
      code: secretCode.code
    };
  }

  async authenfication(dto: ChechkCodeDto): Promise<IAuthenticationResponse> {
    const secret = await this.secretRepository.findOne({
      where: { code: dto.code.toString() },
      relations: ['user']
    })

    if (!secret) {
      throw new BadRequestException("invalid code")
    }

    await this.secretRepository.delete({ id: secret.id })

    const payload = { sub: secret.user.id, phone: secret.user.phone,role:secret.user.role }

    return {
      accessToken: this.jwtservice.sign(payload, { secret: this.jwtconfig.secret1 }),
      message: "authentication successful"
    }
  }


}

