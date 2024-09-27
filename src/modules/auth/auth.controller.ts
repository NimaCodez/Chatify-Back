import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserSignupDto } from '../user/dtos/signup.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiConsumes, ApiProperty, ApiTags } from '@nestjs/swagger';
import { SwaggerConsumes } from 'src/common/enums/swagger-consumes.enum';
import { LocalAuthGuard } from './guards/local.guard';
import { Request, Response } from 'express';

@Controller('/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  signup(@Body() signupDto: UserSignupDto) {
    return this.authService.signup(signupDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'nimacodes' },
        password: { type: 'string', example: 'nima^285T%' },
      },
      required: ['username', 'password'],
    },
  })

  // TODO: change auth to cookie
  async login(@Req() req: Request) {
    console.log(req.user);
    return await this.authService.login(req.user);
  }
}
