import { Injectable, Scope } from '@nestjs/common';
import { CreateSongDTO } from './dto/create-song-dto';
import { Repository } from 'typeorm';
import { Song } from './song.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class SongsService {
  // local array
  constructor(
    @InjectRepository(Song) private songsRepository: Repository<Song>,
  ) {}

  async create(songDTO: CreateSongDTO): Promise<Song> {
    const song = new Song();
    song.title = songDTO.title;
    song.artist = songDTO.artist;
    song.duration = songDTO.duration;
    song.lyrics = songDTO.lyrics;
    song.releaseDate = songDTO.releaseDate;
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
  async update(id: number, songDTO : CreateSongDTO){
    // return await this.songsRepository.update

  }
}
