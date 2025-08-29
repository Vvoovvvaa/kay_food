import { IsEnum } from "class-validator";
import { UserRole } from "src/entities/enums/role.enum";


export class ChangeRoleDTO{
    @IsEnum(UserRole,{message:"role most be one admin,user,manager"})
    role:UserRole
}