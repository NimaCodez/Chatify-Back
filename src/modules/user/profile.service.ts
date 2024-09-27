import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepo: Repository<ProfileEntity>,
  ) {}

  async getMe(reqUser: Express.User) {
    console.log(reqUser);
  }
}
