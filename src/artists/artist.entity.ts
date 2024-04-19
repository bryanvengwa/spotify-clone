import { User } from "src/users/users.entity";
import { Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

@Entity('artists')
export class Artist{
    @PrimaryColumn()
    id : number;
    @OneToOne(()=>User)
    @JoinColumn()
    user : User;
}