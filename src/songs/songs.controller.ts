import { Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import { STATUS_CODES } from 'http';

@Controller('songs')
export class SongsController {
  constructor(private songService: SongsService) {}

  @Post()
  create(@Body() CreateSongDTO: CreateSongDTO) {
    this.songService.create(CreateSongDTO);
    return this.songService.findAll();
  }

  @Get()
  findAllSongs() {
    try{
        throw new Error('Error in db while fetching records')
        return this.songService.findAll();
    }catch(err){
        throw new HttpException('server yaita error' , HttpStatus.FORBIDDEN, {
            cause: err
        })
    }
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
