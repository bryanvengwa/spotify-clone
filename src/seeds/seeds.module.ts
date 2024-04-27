import { Module } from '@nestjs/common';
import { SeedsService } from './seeds.service';
import { SeedsController } from './seeds.controller';

@Module({
  controllers: [SeedsController],
  providers: [SeedsService],
})
export class SeedsModule {}
