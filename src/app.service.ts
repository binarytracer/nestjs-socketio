import { Injectable } from '@nestjs/common';
import { EventsGateway } from './events/events.gateway';
import { Server } from 'socket.io';
import { WebSocketServer } from '@nestjs/websockets';

@Injectable()
export class AppService {
  @WebSocketServer()
  server: Server;

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
