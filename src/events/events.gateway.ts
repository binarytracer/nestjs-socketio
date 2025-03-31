import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    console.table(args);
    console.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any) {
    const event = 'events';
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { event, data };
  }

  @SubscribeMessage('identity')
  identity(@MessageBody() data: number): number {
    return data;
  }

  // Emit event to a specific client
  emitEventToClient(clientId: string, eventName: string, payload: any) {
    this.server.to(clientId).emit(eventName, payload);
  }
}
