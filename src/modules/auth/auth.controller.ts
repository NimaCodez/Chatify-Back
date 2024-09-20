import { Body, Controller, Post } from "@nestjs/common";
import { UserSignupDto } from "../user/dtos/signup.dto";
import { AuthService } from "./auth.service";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { SwaggerConsumes } from "src/common/enums/swagger-consumes.enum";

@Controller('/auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
    signup(@Body() signupDto: UserSignupDto) {
        return this.authService.signup(signupDto);    
    }
}