import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/entities/user.entity';
import { JwtPayload } from './types/jwt-payload.type';
import { jwtConfig } from 'src/config/env';

@Injectable()
export class JWTService {
  constructor(private jwtService: JwtService) {}
  async signAccessToken(
    user: Partial<UserEntity>,
  ): Promise<{ accessToken: string }> {
    const payload: JwtPayload = {
      username: user.username,
      userId: user.id,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: jwtConfig.get('secret'),
      expiresIn: jwtConfig.get('expiresIn'),
    });

    return { accessToken };
  }

  signRefreshToken() {}

  verifyRefreshToken() {}
}
