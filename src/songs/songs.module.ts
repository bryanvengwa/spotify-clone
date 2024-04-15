import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { connection } from 'src/common/constants/connection';

const mockSongService = {
  findAll(){
    return [{id: 1, title: 'lasting lover'}]
  }
}
@Module({
  controllers: [SongsController],
  providers: [
    SongsService,

    // {
    //   provide: SongsService,
    //   useValue: mockSongService,  
    // },
    {
      provide: 'CONNECTION',
      useValue: connection
    }
  ],
})
export class SongsModule {}
