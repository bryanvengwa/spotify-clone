
import { Module } from "@nestjs/common";
import { PlayListsController } from "./playlists.contoller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Playlist } from "./playlist.entity";
import { PlayListsService } from "./playlist.service";
import { Song } from "src/songs/song.entity";
import { User } from "src/users/users.entity";
@Module({
  imports: [TypeOrmModule.forFeature([Playlist, Song, User])],
  controllers: [PlayListsController],
  providers: [PlayListsService],
})
export class PlayListModule {}
