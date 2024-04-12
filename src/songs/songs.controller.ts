import { Controller, Delete, Get, Put } from '@nestjs/common';

@Controller('songs')
export class SongsController {
  @Get()
  findAllSongs() {
    return 'find all songs endpoint';
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
  delete(){

  }
}
