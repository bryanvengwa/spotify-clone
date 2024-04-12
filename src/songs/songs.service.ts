import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
  // local array

  private readonly songs : string[] = [];
  create(song : string) {
    // save the songs to the db
    this.songs.push(song);
    return this.songs;
  }
  findAll() {
    // fetch the songs from the db
    return this.songs;
  }
}
