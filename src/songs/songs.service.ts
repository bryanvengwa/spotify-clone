import { Injectable } from '@nestjs/common';
import { CreateSongDTO } from './dto/create-song-dto';

@Injectable()
export class SongsService {
  // local array

  private readonly songs : any[] = [];
  create(song : CreateSongDTO) {
    // save the songs to the db
    this.songs.push(song);
    return this.songs;
  }
  findAll() {
    // fetch the songs from the db
    return this.songs;
  }
}
