import {CanActivate,ExecutionContext,Injectable,UnauthorizedException,} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { Ijwtconfig } from '../models';
// import { AdminJwtPayload } from './models/jwt-admin.payload.model';


@Injectable()
export class AdminAuthGuard implements CanActivate {
  private jwtConfig: Ijwtconfig;
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtConfig = this.configService.get("JWT_CONFIG") as Ijwtconfig
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
  const request = context.switchToHttp().getRequest();
  const authHeader = request.headers['authorization'];

  if (!authHeader) {
    throw new UnauthorizedException('You are not authorized, please login');
  }

  const [bearer, token] = authHeader.trim().split(' ');

  if (bearer.toLowerCase() !== 'bearer' || !token) {
    throw new UnauthorizedException('Invalid authorization header format');
  }

  let payload: any;

  try {
    payload = this.jwtService.verify(token, { secret: this.jwtConfig.admin_secret });
  } catch {
    try {
      payload = this.jwtService.verify(token, { secret: this.jwtConfig.admin_secret1 });
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  request.user = {
    id: payload.sub,
    name: payload.name,
    temp: payload.temp ?? false,
  };

  return true;
  }
}
