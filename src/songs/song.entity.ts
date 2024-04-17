import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column('varchar', {array:true})
  artist: string[];
  @Column()
  releaseDate : Date;

  @Column('date')
  duration : Date;
  @Column('text')
  lyrics : string


}
