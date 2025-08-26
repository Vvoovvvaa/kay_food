import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    productName:string

    @IsString()
    @IsNotEmpty()
    description:string

    @IsNumber()
    @IsNotEmpty()
    weight:number

    @IsNumber()
    @IsNotEmpty()
    price:number

    @IsNotEmpty()
    categoryId:number



}
