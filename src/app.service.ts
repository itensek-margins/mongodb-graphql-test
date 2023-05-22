import { Injectable } from '@nestjs/common';
import { RootConfig } from './common/config/env.validation';

@Injectable()
export class AppService {
  constructor(private readonly config: RootConfig) {}

  getInitialData(): any {
    return {
      name: 'Test Project API',
      version: this.config.application.PROJECT_VERSION,
    };
  }
}
