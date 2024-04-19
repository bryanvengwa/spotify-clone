import { Artist } from 'src/artists/artist.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column('varchar', { array: true })
  artist: string[];
  @Column('date')
  releaseDate: Date;

  @Column({ type: 'time' })
  duration: Date;

  @Column({ type: 'text' })
  lyrics: string;

  @ManyToMany(() => Artist, (artist) => artist.songs)
  @JoinTable({name : 'songs_artists'})
  artists: Artist[];
}
