import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { log } from 'console';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' }, namespace: '/channel' })
export class ChannelGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('ping')
  getGroupLists(client: Socket, data: any) {
    log('message received from client: ', client.id);

    log('Data: ', data);
    client.emit('list', {
      channels: [
        { name: 'channel1' },
        { name: 'channel2' },
        { name: 'channel3' },
      ],
    });
  }
}
