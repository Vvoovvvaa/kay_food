import { PartialType } from '@nestjs/mapped-types';
import { CreateZoneDTO} from './create-zone.dto';

export class UpdateZoneDto extends PartialType(CreateZoneDTO) {}
