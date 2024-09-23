import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConfig } from 'src/config/env';
import { JwtPayload } from '../types/jwt-payload.type';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.get('secret'),
    });
  }

  async validate(payload: JwtPayload) {
    const { username, sub } = payload;
    return { username, userId: sub };
  }
}
