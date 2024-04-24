import { Exclude } from 'class-transformer';
import { Playlist } from 'src/playlist/playlist.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;
  @OneToMany(() => Playlist, (playlist) => playlist.user)
  playLists: Playlist[];

  @Column({ nullable: true, type: 'text' })
  twoFASecret: string;
  @Column({ default: false, type: 'boolean' })
  enable2FA: boolean;
}
