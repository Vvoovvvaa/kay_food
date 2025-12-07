import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { IgoogleConfig } from '@app/common/models';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private readonly configservice: ConfigService) {
        const googlConfig = configservice.get<IgoogleConfig>("GOOGLECONFIG")
        if (!googlConfig) {
            throw new NotFoundException("the file google config is missing")
        }
        super({
            clientID: googlConfig.clientID!,
            clientSecret: googlConfig.clientSecret!,
            callbackURL: googlConfig.callbackURL!,
            scope: ['profile', 'email', 'openid',
                'https://www.googleapis.com/auth/drive',
                'https://mail.google.com/',
                'https://www.googleapis.com/auth/contacts',
            ],
        });

    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ): Promise<any> {
        const { name, emails, photos } = profile;
        const user = {
            email: emails[0].value,
            firstName: name?.givenName,
            lastName: name?.familyName,
            picture: photos[0]?.value,
            accessToken,
        };
        done(null, user);
    }

}
