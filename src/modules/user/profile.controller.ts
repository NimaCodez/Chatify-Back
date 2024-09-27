import { Body, Controller, Get, Patch, Req } from "@nestjs/common";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { PassportJWTVerification } from "src/common/decorators/passport-jwt-verification.decorator";
import { ProfileService } from "./profile.service";
import { Request } from "express";
import { UpdateProfileDto } from "./dtos/update-profile.dto";
import { SwaggerConsumes } from "src/common/enums/swagger-consumes.enum";

@Controller('profile')
@ApiTags('Profile')
export class ProfileController {
    constructor(private profileService: ProfileService) {}

    @PassportJWTVerification()
    @Get()
    async me(@Req() req: Request) {
        return await this.profileService.getMe(req.user);
    }

    @PassportJWTVerification()
    @Patch()
    @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
    async update(@Req() req: Request, @Body() updateProfileDto: UpdateProfileDto) {
        console.log(updateProfileDto)
        return await this.profileService.updateProfile(req.user, updateProfileDto);
    }
}