import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ZonesController } from './zone.controller';
import { ZonesService } from './zone.service';
import { Zone } from '../../../../../libs/common/src/database/entities';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Zone]),
  JwtModule.register({})],
  controllers: [ZonesController],
  providers: [ZonesService],
})
export class ZonesModule { }