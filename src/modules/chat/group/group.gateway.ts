import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { log } from 'console';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' }, namespace: '/group' })
export class GroupGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('ping')
  getGroupLists(client: Socket, data: any) {
    log('message received from client: ', client.id);
    log('Data: ', data);
    client.emit('list', {
      groups: [{ name: 'group1' }, { name: 'group2' }, { name: 'group3' }],
    });
  }

  @SubscribeMessage('join-room')
  getgg(client: any, data: any) {
    console.log(client.id, data);
  }
}
