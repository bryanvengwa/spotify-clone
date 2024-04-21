import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  Scope,
  UseGuards,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import { STATUS_CODES } from 'http';
import { Connection } from 'src/common/constants/connection';
import { Song } from './song.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { updateSongDTO } from './dto/update-song-dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ArtistJwtGuard } from 'src/auth/artist-jwt-guard';

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
  @UseGuards(ArtistJwtGuard)
  async create(
    @Body() CreateSongDTO: CreateSongDTO,
    @Request() req,
  ): Promise<Song> {
    console.log(req.user)
    console.log('create endpoitng song running')
    return this.songService.create(CreateSongDTO);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 1,
  ): Promise<Pagination<Song>> {
    // limit = limit > 100 ? limit : 10;
    return this.songService.paginate({ page, limit });
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<Song> {
    return this.songService.findOne(id);
  }
  @Put(':id')
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateSongDTO: updateSongDTO,
  ): Promise<UpdateResult> {
    return this.songService.update(id, updateSongDTO);
  }
  @Delete(':id')
  delete(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<DeleteResult> {
    return this.songService.remove(id);
  }
}
