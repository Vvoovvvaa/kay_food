import { ApiHideProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @ApiHideProperty()
    productName:string

    @IsString()
    @IsNotEmpty()
    @ApiHideProperty()
    description:string

    @IsNumber()
    @IsNotEmpty()
    @ApiHideProperty()
    weight:number

    @IsNumber()
    @IsNotEmpty()
    @ApiHideProperty()
    price:number

    @IsNotEmpty()
    @ApiHideProperty()
    categoryId:number



}
