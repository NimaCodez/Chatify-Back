import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { log } from 'console';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' }, namespace: '/chat' })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  afterInit(server: any) {
    log('Socket initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    const { sockets } = this.server.sockets;
    log('handle connected');
    log(`ClientID: ${client.id} connected.`);
    log(`Online users ${sockets.size}`);
  }

  handleDisconnect(client: Socket) {
    const { sockets } = this.server.sockets;
    log('disconnected');
    log(`ClientID: ${client.id} disconnected.`);
    log(`Online users ${sockets.size}`);
  }

  @SubscribeMessage('ping')
  pingHandler(client: Socket, data: any) {
    log('message received from client: ', client.id);
    log('Data: ', data);
    client.emit('pong', { message: 'Hello client' });
  }
}
