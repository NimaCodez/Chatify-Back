import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { redisConfig } from 'src/config/env';

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {}

  async setValue(key: string, value: string): Promise<void> {
    await this.redisClient.set(
      key,
      value,
      'EX',
      +redisConfig.get('redisExpirationTime'),
    );
  }

  async getValue(key: string): Promise<string | null> {
    return await this.redisClient.get(key, (err, value) => {
      console.log(err);
      if (err.message.includes('exp')) return null;
      if (!err) return value;
      else return null;
    });
  }
}
