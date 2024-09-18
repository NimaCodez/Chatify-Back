import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from 'src/chat/chat.gateway';
import { ChannelGateway } from 'src/channel/channel.gateway';
import { GroupGateway } from 'src/group/group.gateway';
import { IndexGateway } from 'src/index.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    ChatGateway,
    ChannelGateway,
    GroupGateway,
    IndexGateway,
  ],
})
export class AppModule {}
