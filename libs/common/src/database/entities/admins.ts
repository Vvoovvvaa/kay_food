import { Column, Entity, OneToOne } from "typeorm";
import { Base } from "./base";
import { string } from "joi";
import { accauntStatus } from "../enums";
import { UserSecurity } from "./user-security";
import { AdminSecurity } from "./admin-security";

@Entity("admins")
export class Admins extends Base{
    @Column()
    name:string

    @Column()
    email:string

    @Column()
    password:string

    @Column({default:accauntStatus.ACTIVE,type:"enum",enum:accauntStatus})
    accountStatus:accauntStatus

    @OneToOne(() => AdminSecurity,sec => sec.admin )
    security:AdminSecurity


    

    

    
}