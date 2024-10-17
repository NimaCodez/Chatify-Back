import { redisConfig } from './env';
import Redis from 'ioredis';

export const RedisOptions = {
  provide: 'REDIS_CLIENT',
  useFactory: () => {
    return new Redis({
      host: redisConfig.get('host'),
      port: redisConfig.get('port'),
    });
  },
};
