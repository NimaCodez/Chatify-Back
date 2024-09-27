import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsOptional, IsString, Length } from "class-validator";

export class UpdateProfileDto {
    @IsString()
    @ApiPropertyOptional()
    @IsOptional()
    @Length(1, 80, { message: 'Bio must be between 1 and 80 characters' })
    bio: string;

    @IsString()
    @ApiPropertyOptional()
    @IsOptional()
    @Length(1, 100, { message: 'Location must be between 1 and 100 characters' })
    location: string;

    @IsString()
    @ApiPropertyOptional()
    @IsOptional()
    @Length(1, 100, { message: 'Website must be between 1 and 100 characters' })
    website: string;

    @IsString()
    @ApiPropertyOptional()
    @IsOptional()
    @Length(1, 100, { message: 'Twitter must be between 1 and 100 characters' })
    x: string;

    @IsString()
    @ApiPropertyOptional({ format: 'date' })
    @IsOptional()
    @IsDate()
    birthday: string;

    @ApiPropertyOptional({ format: 'binary' })
    @IsOptional()
    @IsString()
    avatar: string;
}