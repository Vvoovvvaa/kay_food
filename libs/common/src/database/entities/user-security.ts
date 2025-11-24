import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Base } from "./base";
import { User } from "./user";
import { Admins } from "./admins";

@Entity('user_security')
export class UserSecurity extends Base {
    @Column({ default: 0, name: "temporary_Block" })
    temporaryBlock: number

    @Column({ default: false, name: "permanetly_block" })
    permanetlyBlock: boolean

    @Column({ default: 0, name: "total_login_attemps" })
    totalLoginAttemps: number

    @OneToOne(() => User, (user) => user.security)
    @JoinColumn()
    user: User

    @Column({ type: 'timestamp', nullable: true })
    temporaryBlockUntil: Date | null;



}