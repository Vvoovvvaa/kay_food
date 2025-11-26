import { ApiHideProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, MinLength, IsOptional, IsNumber} from "class-validator"



export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    @ApiHideProperty()
    categoryNameEn: string

    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    @ApiHideProperty()
    descriptionEn: string

    @IsNotEmpty()
    @IsString()
    @ApiHideProperty()
    categoryNameRu: string

    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    @ApiHideProperty()
    descriptionRu: string

    @IsNotEmpty()
    @IsString()
    @ApiHideProperty()
    categoryNameAm: string

    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    @ApiHideProperty()
    descriptionAm: string

    @IsOptional()
    @IsNumber()
    @ApiHideProperty()
    parentId: number
}
