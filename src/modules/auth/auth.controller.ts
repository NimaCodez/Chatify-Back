import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserSignupDto } from './dtos/signup.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SwaggerConsumes } from 'src/common/enums/swagger-consumes.enum';
import { LocalAuthGuard } from './guards/local.guard';
import { Request, Response } from 'express';
import { Response as CreateResponse } from 'src/common/utils/create-reponse';

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
  async login(@Req() req: Request, @Res() res: Response) {
    const { accessToken } = await this.authService.login(req.user);
    res.cookie('authorization', accessToken, {
      httpOnly: true,
      maxAge: 15 * 1000 * 60,
      domain: 'localhost',
    });

    return res.json(CreateResponse('Logged in successfully 🎉', HttpStatus.OK));
  }

  async forgotPassword() {}
}
