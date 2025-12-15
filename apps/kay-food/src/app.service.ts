import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import { Language, MediaFiles, UserSecurity } from '@app/common/database/entities';
import { User } from '@app/common/database/entities';
import { accauntStatus, Languages } from '@app/common/database/enums';

@Injectable()
export class AppService {
  constructor(

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(UserSecurity)
    private readonly securityRepository: Repository<UserSecurity>,

    @InjectRepository(MediaFiles)
    private readonly mediaFilesRepository: Repository<MediaFiles>,

    @InjectRepository(Language)
    private readonly languageReposiroty: Repository<Language>,

    private readonly jwtService: JwtService,
  ) { }

  async oauthLogin(req) {
    if (!req.user) {
      return { message: 'No user from OAuth provider' };
    }

    const { facebookId, email, firstName, lastName,picture} = req.user;

    let user: User | null = null;

    if (facebookId) {
      user = await this.userRepository.findOne({
        where: { facebookId },
        relations: ['security'],
      });
  } 

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
        facebookId: facebookId || null,
        accountStatus: accauntStatus.ACTIVE,
      });
      await this.userRepository.save(user);

      const security = this.securityRepository.create({ user });
      await this.securityRepository.save(security);
      user.security = security;

      if (picture) {
        const media = this.mediaFilesRepository.create({
          path: picture,
          size: 0,
          meta: { provider: 'oauth' },
        });

        await this.mediaFilesRepository.save(media);

        user.mediaFiles = [media];
        await this.userRepository.save(user);
      }
    }

    const payload = {
      sub: user.id,
      facebookId,
      email,
      firstName,
      lastName,
    };
    const jwt = this.jwtService.sign(payload, { expiresIn: '1d' });

    return {
      message: 'User logged in via OAuth provider',
      user,
      jwt,
    };
  }
}