import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserSignupDto } from './dtos/signup.dto';
import { RepetitiveData } from './dtos/repetitiveData.dto';

export type User = any;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async findOne(username: string): Promise<User | null> {
    return this.userRepo.findOneBy({ username });
  }
}
