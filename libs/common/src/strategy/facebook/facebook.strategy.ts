import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-facebook';
import { ConfigService } from '@nestjs/config';
import { IFacebookConfig } from '@app/common/models';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
    constructor(private readonly configService: ConfigService) {
        const fbConfig = configService.get<IFacebookConfig>('FACEBOOK_CLIENT_CONFIG');

        super({
            clientID: fbConfig!.clientId,
            clientSecret: fbConfig!.clientSecret,
            callbackURL: fbConfig!.clientUrl,
            profileFields: ['emails', 'name', 'photos'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile) {
        const { id, name, emails, photos } = profile;

        return {
            facebookId: id,
            email: emails?.[0]?.value || null,
            firstName: name?.givenName || '',
            lastName: name?.familyName || '',
            picture: photos?.[0]?.value || null,
            accessToken,
        };
    }

}