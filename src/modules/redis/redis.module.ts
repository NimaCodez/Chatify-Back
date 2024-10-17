import { Global, Module } from '@nestjs/common';
import Redis from 'ioredis';
import { redisConfig } from 'src/config/env';
import { RedisOptions } from 'src/config/redis.config';
import { AuthModule } from '../auth/auth.module';

@Global()
@Module({
  providers: [RedisOptions],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
