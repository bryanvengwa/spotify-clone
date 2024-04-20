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

  @Column()
  email: string;

  @Column()
  password: string;
  @OneToMany(()=> Playlist , (playlist)=> playlist.user)
  playLists: Playlist [];
}
