import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from 'src/modules/chat/private/chat.gateway';
import { IndexGateway } from 'src/modules/chat/index.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from 'src/config/typeorm.config';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig()),
    RedisModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway, IndexGateway],
})
export class AppModule {}
