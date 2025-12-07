import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import { UserSecurity } from '@app/common/database/entities';
import { User } from '@app/common/database/entities';
import { accauntStatus } from '@app/common/database/enums';

@Injectable()
export class AppService {
  constructor(

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(UserSecurity)
    private readonly securityRepository: Repository<UserSecurity>,

    private readonly jwtService: JwtService,
  ) { }

  async oauthLogin(req) {
    if (!req.user) {
      return { message: 'No user from OAuth provider' };
    }

    const { email, firstName, lastName,openid } = req.user;

    let user: User | null = null;

    if (!user && email) {
      user = await this.userRepository.findOne({
        where: { email },
        relations: ['security'],
      });
    }

    if (!user) {
      user = this.userRepository.create({
        firstName,
        lastName,
        email: email || null,
        accountStatus: accauntStatus.ACTIVE,
      });
      await this.userRepository.save(user);

      const security = this.securityRepository.create({ user });
      await this.securityRepository.save(security);
      user.security = security;
    }

    const payload = {
      sub: user.id,
      email,
      firstName,
      lastName,
    };
    const jwt = this.jwtService.sign(payload, { expiresIn: '1d' });

    return {
      message: 'User logged in via OAuth provider',
      user,
      jwt,
      openid
    };
  }
}