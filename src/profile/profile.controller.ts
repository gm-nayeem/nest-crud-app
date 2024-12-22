import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post(':id')
  createProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    if (!id) {
      throw new BadRequestException('Invalid user id');
    }

    return this.profileService.createProfile(id, createProfileDto);
  }

  @Get()
  getProfile() {
    return this.profileService.getProfile();
  }
}
