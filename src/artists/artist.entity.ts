import { Song } from "src/songs/song.entity";
import { User } from "src/users/users.entity";
import { Entity, JoinColumn, ManyToMany, OneToOne, PrimaryColumn } from "typeorm";

@Entity('artists')
export class Artist{
    @PrimaryColumn()
    id : number;
    @OneToOne(()=>User)
    @JoinColumn()
    user : User;

    @ManyToMany(()=>Song, (song) => song.artist)
    songs : Song[];
}