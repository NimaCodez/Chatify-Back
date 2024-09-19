import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from 'src/modules/chat/chat/chat.gateway';
import { ChannelGateway } from 'src/modules/chat/channel/channel.gateway';
import { GroupGateway } from 'src/modules/chat/group/group.gateway';
import { IndexGateway } from 'src/modules/chat/index.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from 'src/config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig())],
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
