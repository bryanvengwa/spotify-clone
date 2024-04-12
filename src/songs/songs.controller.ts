import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
  constructor(private songService: SongsService) {}

  @Post()
  create() {
    this.songService.create('First person shooter');
    return this.songService.findAll();
  }

  @Get()
  findAllSongs() {
    return this.songService.findAll();
  }

  @Get(':id')
  findOne() {
    return 'fetch song based on the id';
  }
  @Put(':id')
  update() {
    return 'update song based on the id';
  }
  @Delete(':id')
  delete() {}
}
