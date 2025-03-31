import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'users' })
export class UsersGateway {
  @SubscribeMessage('greet')
  handleMessage(client: any, payload: any): string {
    console.log(payload);
    return 'Hello world! from users';
  }
}
