import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from './entities/profile.entity';
import { Repository, UpdateResult } from 'typeorm';
import { Request } from 'express';
import { JwtAuthenticatedUser } from '../auth/types/jwt-authenticated-user.type';
import { UpdateProfileDto } from './dtos/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepo: Repository<ProfileEntity>,
  ) {}

  async getMe(reqUser: Express.User) {
    const userData: JwtAuthenticatedUser = {
      ...reqUser,
    } as JwtAuthenticatedUser;
    const { userId } = userData;

    let profileInfo = await this.profileRepo.findOneBy({
      user_id: userId,
    });

    if (!profileInfo) {
      profileInfo = await this.createProfile(userId);
    }

    return profileInfo;
  }

  async createProfile(userId: string) {
    let profile = this.profileRepo.create({ user_id: userId });
    profile = await this.profileRepo.save(profile);
    if (profile) return profile;
    else throw new BadRequestException();
  }

  async updateProfile(requestUser: Express.User, reqBody: UpdateProfileDto) {
    const userData: JwtAuthenticatedUser = {
      ...requestUser,
    } as JwtAuthenticatedUser;
    const { userId } = userData;

    let profile: ProfileEntity | UpdateResult =
      await this.profileRepo.findOneBy({ user_id: userId });
    if (!profile) throw new NotFoundException("This username does't exist.");

    const updateBody = await this.filterNullAndUndefinedValues(reqBody);
    profile = await this.profileRepo.update(
      { user_id: userId },
      { ...updateBody },
    );
    return profile;
  }

  async filterNullAndUndefinedValues(requestBody: object) {
    let updateBody = { ...requestBody };
    for (const [key, value] of Object.entries(updateBody)) {
      if (value !== undefined && value !== null) {
        updateBody[key] = value;
      }
    }
    return updateBody;
  }
}
