import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConfig } from 'src/config/env';
import { JwtPayload } from '../types/jwt-payload.type';
import { Request } from 'express';

const cookieExtractor = (req: Request) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['authorization'];
  }
  return token;
};

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: jwtConfig.get('secret'),
    });
  }

  async validate(payload: JwtPayload) {
    const { username, sub } = payload;
    return { username, userId: sub };
  }
}
