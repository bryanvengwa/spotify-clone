import { Module } from '@nestjs/common';
import { SeedService } from './seeds.service';

@Module({
  providers: [SeedService],
})
export class SeedsModule {}
