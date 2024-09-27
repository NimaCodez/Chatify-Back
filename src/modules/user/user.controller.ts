import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
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
