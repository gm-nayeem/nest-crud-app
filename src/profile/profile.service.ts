import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Profile } from './entities/profile.entity';
import { User } from '../users/entities/user.entity';
import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createProfile(id: number, createProfileDto: CreateProfileDto) {
    const user = await this.userRepository.findOneById(id);
    if (!user) {
      throw new Error(`User with id ${id} not found.`);
    }

    const profile = new Profile();
    profile.picture = createProfileDto.picture;
    profile.gender = createProfileDto.gender;
    // const savedProfile = await this.profileRepository.save(profile); // use cascade which automatically saves the profile

    user.profile = profile;
    return this.userRepository.save(user);
  }

  async getProfile() {
    return await this.profileRepository.find({ relations: ['user'] });
  }
}
