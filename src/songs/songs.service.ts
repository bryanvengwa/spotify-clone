import { Injectable, Scope } from '@nestjs/common';
import { CreateSongDTO } from './dto/create-song-dto';
import { Repository } from 'typeorm';
import { Song } from './song.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, Pagination, paginate  } from 'nestjs-typeorm-paginate';
import { Artist } from 'src/artists/artist.entity';
import { updateSongDTO } from './dto/update-song-dto';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class SongsService {
  // local array
  constructor(
    @InjectRepository(Song) private songsRepository: Repository<Song>,
    @InjectRepository(Artist) private artistRepository: Repository<Artist>,
  ) {}

  async create(songDTO: CreateSongDTO): Promise<Song> {
    const song = new Song();
    song.title = songDTO.title;

    song.duration = songDTO.duration;
    song.lyrics = songDTO.lyrics;
    song.releaseDate = songDTO.releaseDate;
    const artists = await this.artistRepository.findByIds(songDTO.artist)
    console.log('Dto artists: ', songDTO.artist)
    song.artists = artists
    return await this.songsRepository.save(song);
  }
  async findAll() : Promise<Song[]> {
    return await this.songsRepository.find();
  }

  async findOne(id : number){
    return await this.songsRepository.findOneBy({id : id});
    

  }

  async remove(id : number){
    return await this.songsRepository.delete({id : id});
  }
  // refactored this previously had a type of createSongDto
  async update(id: number, recordToUpdate : updateSongDTO){

    return await this.songsRepository.update(id, recordToUpdate)

  }

  async  paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    const queryBuilder = this.songsRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.releaseDate', 'DESC');
    return paginate<Song>(queryBuilder, options);
 }
}
