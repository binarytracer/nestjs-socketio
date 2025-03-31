import { Injectable } from '@nestjs/common';
import { EventsGateway } from './events/events.gateway';

@Injectable()
export class AppService {
  constructor(private readonly eventGateway: EventsGateway) {}
  getHello(agentId?: string) {
    if (agentId) {
      this.eventGateway.emitEventToClient(agentId, 'events', {
        message: ' hello world from agent',
      });
    }
    return { message: 'Hello World!' };
  }
}
