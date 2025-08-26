import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { Base } from "./base";
import { UserRole } from "./enums/role.enum";
import { MediaFiles } from "./media-files";
import { Order } from "./order";

@Entity('Users')
export class User extends Base {
    @Column({ name: "first_name",nullable:true })
    firstName: string 

    @Column({ name: "last_name",nullable:true })
    lastName: string

    @Column({nullable:true})
    age:number

    @ManyToMany(() => MediaFiles,{cascade:true})
    @JoinTable({
        name: "user_media_files",
        joinColumn: { name: "user_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "media_file_id", referencedColumnName: "id" }
    })
    mediaFiles: MediaFiles[]

    @Column()
    phone: string

    @Column({ default: UserRole.USER })
    role: UserRole

    @OneToMany(() => Order, order => order.user)
    orders: Order[]


}