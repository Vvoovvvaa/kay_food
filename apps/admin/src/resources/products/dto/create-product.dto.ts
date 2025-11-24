import { ApiHideProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    productNameEn: string

    @IsString()
    @IsNotEmpty()
    @ApiHideProperty()
    productNameRu: string

    @IsString()
    @IsNotEmpty()
    productNameAm: string

    @IsString()
    @IsNotEmpty()
    descriptionEn: string

    @IsString()
    @IsNotEmpty()
    descriptionRu: string

    @IsString()
    @IsNotEmpty()
    descriptionAm: string

    @IsNumber()
    @IsNotEmpty()
    weight: number


    @IsNumber()
    @IsNotEmpty()
    price: number


    @IsNotEmpty()
    categoryId: number



}
