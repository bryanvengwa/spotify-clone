import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { DevConfigService } from './common/providers/DevConfigService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Song } from './songs/song.entity';
import { Artist } from './artists/artist.entity';
import { User } from './users/users.entity';
import { Playlist } from './playlist/playlist.entity';
import { PlayListModule } from './playlist/playlists.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { dataSourceOptions } from 'db/data-source';
import { SeedsModule } from './seeds/seeds.module';
import { SeedService } from './seeds/seeds.service';
import {ConfigModule} from '@nestjs/config'
const devConfig = {
  port: 3000,
};
const proConfig = {
  port: 4000,
};
@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    SongsModule,
    PlayListModule,
    AuthModule,
    UsersModule,
    ArtistsModule,
    SeedsModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SeedService,
    {
      provide: DevConfigService,
      useClass: DevConfigService,
    },
    {
      provide: 'CONFIG',
      useFactory: () => {
        return process.env.NODE_ENV === 'development' ? devConfig : proConfig;
      },
    },
  ],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {
    console.log('Database Name', dataSource.driver.database);
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(SongsController);
  }
}
