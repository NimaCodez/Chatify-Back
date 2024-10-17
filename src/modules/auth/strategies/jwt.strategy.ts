import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { jwtConfig, redisConfig } from 'src/config/env';
import { JwtPayload } from '../types/jwt-payload.type';
import { Request } from 'express';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import Redis from 'ioredis';

const cookieExtractor = (req: Request) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['authorization'];
  }
  return token;
};

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
    private usersService: UserService,
  ) {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: jwtConfig.get('secret'),
    });
  }

  async validate(payload: JwtPayload) {
    const { username, userId } = payload;
    const cacheKey = `${userId}-${username}`;

    const cachedUser = await this.redisClient.get(cacheKey);
    if (cachedUser) {
      return JSON.parse(cachedUser);
    }

    const user = await this.usersService.findOne(payload.username);
    if (!user) {
      throw new UnauthorizedException();
    }

    const { id, username: userName, email, profile_id } = user;
    const cacheUser = {
      id,
      userName,
      email,
      profile_id,
    };

    await this.redisClient.set(
      cacheKey,
      JSON.stringify(cacheUser),
      'EX',
      +redisConfig.get('redisExpirationTime'),
    );

    return user;
  }
}
