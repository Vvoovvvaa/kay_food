import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Point } from '../models/loaction';
import { ApiHideProperty } from '@nestjs/swagger';



export class CreateZoneDTO {
  @IsString()
  @ApiHideProperty()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ApiHideProperty()
  perimeter: Point[];
}