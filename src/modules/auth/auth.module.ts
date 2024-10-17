import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { HashService } from './hash.service';
import { JWTService } from './jwt.service';
import { jwtConfig } from 'src/config/env';
import { RedisModule } from '../redis/redis.module';
import { RedisService } from '../redis/redis.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConfig.get('secret'),
    }),
    RedisModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    HashService,
    JwtService,
    JWTService,
    RedisService,
    UserService,
  ],
})
export class AuthModule {}
