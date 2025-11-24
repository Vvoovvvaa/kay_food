import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Base } from "./base";
import { Admins } from "./admins";

@Entity('admin_security')
export class AdminSecurity extends Base {
    @Column({ default: 0, name: "temporary_Block" })
    temporaryBlock: number

    @Column({ default: false, name: "permanetly_block" })
    permanetlyBlock: boolean

    @Column({ default: 0, name: "total_login_attemps" })
    totalLoginAttemps: number

    @OneToOne(() => Admins,admins => admins.security)
    @JoinColumn()
    admin:Admins

    @Column({ type: 'timestamp', nullable: true })
    temporaryBlockUntil: Date | null;



}