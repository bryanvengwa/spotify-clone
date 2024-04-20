import { Exclude } from 'class-transformer';
import { Playlist } from 'src/playlist/playlist.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;

  @Column({unique:true})
  email: string;

  @Column()
  @Exclude()
  password: string;
  @OneToMany(()=> Playlist , (playlist)=> playlist.user)
  playLists: Playlist [];
}
