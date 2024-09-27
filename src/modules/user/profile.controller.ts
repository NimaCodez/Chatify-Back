import { Controller, Get, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PassportJWTVerification } from "src/common/decorators/passport-jwt-verification.decorator";
import { ProfileService } from "./profile.service";
import { Request } from "express";

@Controller('profile')
@ApiTags('Profile')
export class ProfileController {
    constructor(private profileService: ProfileService) {}

    @PassportJWTVerification()
    @Get('me')
    async me(@Req() req: Request) {
        return await this.profileService.getMe(req.user);
    }
}