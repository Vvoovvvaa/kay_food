import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Base } from "./base";
import { User } from "./user";

@Entity()
export class SecretCode extends Base{
    @Column({nullable:false})
    code:string

    @ManyToOne(() => User,{eager:true})
    @JoinColumn({name:"user_id"})
    user:User
}