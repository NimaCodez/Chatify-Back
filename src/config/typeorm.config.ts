import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { dbConfig } from './env';

export function TypeOrmConfig(): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    database: dbConfig.get('name'),
    host: dbConfig.get('host'),
    port: dbConfig.get('port'),
    username: dbConfig.get('user'),
    password: dbConfig.get('password'),
    autoLoadEntities: true,
    synchronize: true,
  };
}
