import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { User, SecretCode, UserSecurity } from '../../../../../libs/common/src/database/entities';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ChechkCodeDto } from './dto/check-code.dto';
import { IAuthenticationResponse } from './models/authentication-response';
import { randomCode } from '../../../../../libs/common/src/helpers';
import { Ijwtconfig } from '../../../../../libs/common/src/models';
import { ConfigService } from '@nestjs/config';
import { accauntStatus } from '@app/common/database/enums';

@Injectable()
export class AuthService {
  private jwtconfig: Ijwtconfig;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(SecretCode)
    private readonly secretRepository: Repository<SecretCode>,
    @InjectRepository(UserSecurity)
    private readonly securityRepository: Repository<UserSecurity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtconfig = this.configService.get("JWT_CONFIG") as Ijwtconfig;
  }

  async loginOrRegister(dto: CreateAuthDto): Promise<IAuthenticationResponse> {
    const { phone } = dto;

    let user = await this.userRepository.findOne({ where: { phone } });

    if (!user) {
      user = await this.userRepository.save(
        this.userRepository.create({ phone, accountStatus: accauntStatus.ACTIVE })
      );
    }

    if (user.accountStatus === accauntStatus.PERMANETLY_BLOCK) {
      throw new BadRequestException("Your account is permanently blocked");
    }

    if (user.accountStatus === accauntStatus.TEMPORARY_BLOCK) {
      throw new BadRequestException("Your account is temporarily blocked");
    }

    let security = await this.securityRepository.findOne({ where: { user: { id: user.id } } });

    if (!security) {
      security = this.securityRepository.create({
        user,
        temporaryBlock: 0,
        permanetlyBlock: false,
        totalLoginAttemps: 0,
        temporaryBlockUntil: null,
      });
      await this.securityRepository.save(security);
    }

    const existingCode = await this.secretRepository.findOne({ where: { user: { id: user.id } } });
    if (existingCode) {
      await this.secretRepository.delete({ id: existingCode.id });
    }

    const generated = this.secretRepository.create({
      code: randomCode().toString(),
      user,
    });
    await this.secretRepository.save(generated);

    return {
      accessToken: this.jwtService.sign(
        { sub: user.id, phone: user.phone, role: user.role },
        { secret: this.jwtconfig.secret }
      ),
      code: generated.code,
    };
  }

  async authenfication(dto: ChechkCodeDto, userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['security'],
    });

    if (!user) throw new BadRequestException("Invalid code");

    const security = user.security;
    const secret = await this.secretRepository.findOne({
      where: { code: dto.code, user: { id: userId } },
    });

    if (user.accountStatus === accauntStatus.PERMANETLY_BLOCK) {
      throw new BadRequestException("Your account is permanently blocked");
    }

    if (user.accountStatus === accauntStatus.TEMPORARY_BLOCK && security.temporaryBlockUntil) {
      const now = new Date();
      if (now < security.temporaryBlockUntil) {
        const remaining = Math.ceil((security.temporaryBlockUntil.getTime() - now.getTime()) / 60000);
        throw new BadRequestException(`You can try again in ${remaining} minute(s)`);
      }

      user.accountStatus = accauntStatus.ACTIVE;
      security.temporaryBlockUntil = null;
      await this.userRepository.save(user);
      await this.securityRepository.save(security);
    }

    if (!secret) {
      security.totalLoginAttemps += 1;

      if (security.totalLoginAttemps >= 3) {
        security.totalLoginAttemps = 0;
        security.temporaryBlock += 1;

        const blockUntil = new Date(Date.now() + 1 * 1000);
        security.temporaryBlockUntil = blockUntil;
        user.accountStatus = accauntStatus.TEMPORARY_BLOCK;

        await this.userRepository.save(user);
        await this.securityRepository.save(security);

        if (security.temporaryBlock >= 5) {
          user.security.permanetlyBlock = true
          user.accountStatus = accauntStatus.PERMANETLY_BLOCK
          await this.userRepository.save(user);
          return { message: "Your account is permanently blocked" };
        }

        return { message: "Your account is temporarily blocked for 15 minutes" };
      }

      await this.securityRepository.save(security);
      throw new BadRequestException("Invalid authentication code");
    }

    await this.secretRepository.delete({ id: secret.id });

    security.totalLoginAttemps = 0;
    security.temporaryBlockUntil = null;

    user.accountStatus = accauntStatus.ACTIVE;

    await this.securityRepository.save(security);
    await this.userRepository.save(user);

    const accessToken = this.jwtService.sign(
      { sub: user.id, phone: user.phone, name: user.firstName },
      { secret: this.jwtconfig.secret, expiresIn: '1d' }
    );

    return {
      accessToken,
      message: 'Authentication successful',
    };
  }
}
