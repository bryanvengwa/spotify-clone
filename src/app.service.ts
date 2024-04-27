import { Inject, Injectable } from '@nestjs/common';
import { DevConfigService } from './common/providers/DevConfigService';

@Injectable()
export class AppService {
  constructor(
    private DevConfigService: DevConfigService,
    @Inject('CONFIG') private config: { port: 'string' },
  ) {}
  getHello(): string {
    return `Hello learning nest js ${this.DevConfigService.getDBHOST()} and PORT = ${this.config.port}`;
  }
}
