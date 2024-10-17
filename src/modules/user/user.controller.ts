import { Controller, Get, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { PassportJWTVerification } from 'src/common/decorators/passport-jwt-verification.decorator';

@Controller('user')
@ApiTags('User')
export class UserController {
  @PassportJWTVerification()
  @Get('me')
  getMe(@Req() req: Request) {
    return req.user;
  }
}
