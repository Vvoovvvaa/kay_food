import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Zone } from '../../../../../libs/common/src/database/entities';

@Injectable()
export class ZonesService {

  constructor(
    @InjectRepository(Zone)
    private readonly zoneRepository: Repository<Zone>

  ) { }
  async findOne(id: number): Promise<Zone> {
    const zone = await this.zoneRepository.findOne({ where: { id } })
    if (!zone) {
      throw new NotFoundException('Zone not found')
    }
    return zone
  }


}