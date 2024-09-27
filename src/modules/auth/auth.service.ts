import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserSignupDto } from '../user/dtos/signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { RepetitiveData } from '../user/dtos/repetitiveData.dto';
import { Response } from 'src/common/utils/create-reponse';
import { ProfileEntity } from '../user/entities/profile.entity';
import { HashService } from './hash.service';
import { NemiService } from './also.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private hashService: HashService,
    private JJJWtSS: NemiService,
  ) {}

  async signup(signupDtp: UserSignupDto) {
    const { username, email, password } = signupDtp;
    await this.checkUsernameOrEmailExistence(username, email);

    const hashedPassword = await this.hashService.hash(password);
    const user = this.userRepo.create({
      username,
      password: hashedPassword,
      email,
    });
    const createUserResult = await this.userRepo.save(user);

    if (createUserResult.id)
      return Response('User was Created', HttpStatus.CREATED, {
        userId: user.id,
      });
  }

  async login(user: Partial<UserEntity>) {
    const accessToken = await this.JJJWtSS.signAccessToken(user);
    return accessToken;
  }

  async checkUsernameOrEmailExistence(username: string, email: string) {
    const repetitiveData: RepetitiveData = {
      username: false,
      email: false,
    };

    const [usernameExists, emailExists] = await Promise.all([
      this.userRepo.findOneBy({ username }),
      this.userRepo.findOneBy({ email }),
    ]);

    if (usernameExists) repetitiveData['username'] = true;
    if (emailExists) repetitiveData['email'] = true;

    return this.checkRepetitiveData(repetitiveData);
  }

  async checkRepetitiveData(repetitiveData: RepetitiveData) {
    if (repetitiveData.username || repetitiveData.email) {
      if (repetitiveData.username && repetitiveData.email) {
        throw new BadRequestException('Email and username are already taken');
      } else if (repetitiveData.username) {
        throw new BadRequestException('Username is already taken');
      } else if (repetitiveData.email) {
        throw new BadRequestException('Email is already taken');
      }
    }
  }

  async validateUser(
    username: string,
    pass: string,
  ): Promise<UserEntity | null> {
    const user = await this.userRepo.findOneBy({ username });
    if (!user) throw new NotFoundException('User not found');
    const compareResult = await this.hashService.comparePasswords(
      pass,
      user.password,
    );
    if (user && compareResult) {
      return user;
    }
    return null;
  }
}
