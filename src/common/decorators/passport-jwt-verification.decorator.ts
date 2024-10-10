import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt.guard';

export function PassportJWTVerification() {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    ApiBearerAuth('Authorization'),
  );
}
