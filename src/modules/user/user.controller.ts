import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserSignupDto } from './dtos/signup.dto';
import { LocalAuthGuard } from '../auth/guards/local.guard';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { PassportJWTVerification } from 'src/common/decorators/passport-jwt-verification.decorator';

@Controller('user')
@ApiTags('User')
export class UserController {
  @PassportJWTVerification()
  @Get('me')
  getMe() {
    return 'me';
  }
}
