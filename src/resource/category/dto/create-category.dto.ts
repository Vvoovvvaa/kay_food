import { IsNotEmpty, IsString, MinLength, IsOptional, IsNumber, isString } from "class-validator"



export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    categoryName:string

    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    description:string

    @IsOptional()
    @IsNumber()
    parentId:number
}
