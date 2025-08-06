import { Injectable } from '@nestjs/common';

@Injectable()
export class AppScenario {
  getHello(): string {
    return 'Hello World!';
  }
}
