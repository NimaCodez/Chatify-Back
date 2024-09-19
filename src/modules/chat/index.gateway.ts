import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface User {
  id: number;
  username: string;
  socketId: string;
}

interface JoinPayload {
  roomName: string;
  user: User;
}

interface Message {
  message: string;
  user: User;
  time: string;
  roomName: string;
}

@WebSocketGateway({ cors: { origin: '*' } })
export class IndexGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('join-room')
  async joinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: JoinPayload,
  ) {
    try {
      await client.join(data.roomName);
    } catch (error) {
      client.emit('exception', 'You were disconnected', error);
    }
  }

  @SubscribeMessage('server-chat')
  async serverChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: Message,
  ) {
    if (data.roomName) {
      return this.server.to(data.roomName).emit('client-chat', data);
    }
    return client.emit('exception', 'Room not found');
  }
}
