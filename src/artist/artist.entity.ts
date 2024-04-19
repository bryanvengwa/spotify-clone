import { Entity, PrimaryColumn } from "typeorm";

@Entity('artists')
export class Artist{
    @PrimaryColumn()
    id : number;
}