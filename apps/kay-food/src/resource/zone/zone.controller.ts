import { Controller, Get, Param,UseGuards } from '@nestjs/common';
import { ZonesService } from './zone.service';
import { AuthGuard } from '@app/common/guards';

@UseGuards(AuthGuard)
@Controller('zone')
export class ZonesController {
  constructor(private readonly zoneService: ZonesService) {} 

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zoneService.findOne(+id);
  }
}
