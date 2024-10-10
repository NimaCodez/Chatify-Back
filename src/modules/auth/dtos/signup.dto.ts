import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class UserSignupDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @Length(4, 20, { message: 'Username must be between 4 and 20 characters' })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  password: string;
}
