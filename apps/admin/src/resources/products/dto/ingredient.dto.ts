import { ApiHideProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"


export class ingrediendDTO {
    @IsNotEmpty()
    @IsString()
    @ApiHideProperty()
    nameEn: string

    @IsNotEmpty()
    @IsString()
    @ApiHideProperty()
    nameRu: string

    @IsNotEmpty()
    @IsString()
    @ApiHideProperty()
    nameAm: string

    @IsNotEmpty()
    @IsNumber()
    @ApiHideProperty()
    price: number
}