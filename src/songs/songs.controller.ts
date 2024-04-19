import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Scope,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import { STATUS_CODES } from 'http';
import { Connection } from 'src/common/constants/connection';
import { Song } from './song.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller({
  path: 'songs',
  scope: Scope.REQUEST,
})
export class SongsController {
  constructor(
    private songService: SongsService,
    @Inject('CONNECTION') private connection: Connection,
    @InjectRepository(Song) private songsRepository: Repository<Song>,
  ) {
    console.log(connection);
  }

  @Post()
  async create(@Body() CreateSongDTO: CreateSongDTO): Promise<Song> {
    return this.songService.create(CreateSongDTO);
  }

  @Get()
  findAllSongs() {
    try {
      return  this.songService.findAll();
    } catch (err) {
      throw new HttpException('internal server error', HttpStatus.FORBIDDEN, {
        cause: err,
      });
    }
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) : Promise<Song>  {
    return this.songService.findOne(id);
  }
  @Put(':id')
  update() {
    return 'update song based on the id ';
  }
  @Delete(':id')
  delete(
    @Param('id', new ParseIntPipe({errorHttpStatusCode : HttpStatus.NOT_ACCEPTABLE}))
    id : number
  ) {
    return this.songService.remove(id)
  }
}
