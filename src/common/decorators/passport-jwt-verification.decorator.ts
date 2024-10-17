import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiCookieAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt.guard';

export function PassportJWTVerification() {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    ApiCookieAuth('Authorization'),
  );
}
