import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';

@Module({
  providers: [ArtistsService]
})
export class ArtistsModule {}
