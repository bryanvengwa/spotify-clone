import { Controller, Get } from '@nestjs/common';

@Controller('songs')
export class SongsController {
  @Get()
  findAllSongs() {
    return 'find all songs endpoint';
  }

  @Get(':id')
  findOne(){
    return 'fetch song based on the id'
  }
}
