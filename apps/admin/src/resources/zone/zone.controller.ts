import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ZonesService } from './zone.service';
import { CreateZoneDTO } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { AdminAuthGuard } from '@app/common/guards/admin-auth-guard';

@UseGuards(AdminAuthGuard)
@Controller('zone')
export class ZonesController {
  constructor(private readonly zoneService: ZonesService) {}

  @Post()
  create(@Body() createZoneDto: CreateZoneDTO) {
    return this.zoneService.createZone(createZoneDto);
  }

  @Get()
  findAll() {
    return this.zoneService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zoneService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateZoneDto: UpdateZoneDto) {
    return this.zoneService.updateZone(+id, updateZoneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zoneService.removeZone(+id);
  }
}
