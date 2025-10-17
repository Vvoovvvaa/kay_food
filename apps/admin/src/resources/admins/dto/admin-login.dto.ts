import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AdminLogDto{
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name:string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    password:string
}