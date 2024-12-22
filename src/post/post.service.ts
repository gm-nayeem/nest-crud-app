import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createPost(userId: number, createPostDto: CreatePostDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['profile'],
    });
    if (!user) {
      throw new Error('User not found');
    }

    const post = new Post();
    post.title = createPostDto.title;
    post.des = createPostDto.des;
    post.user = user;
    const savedPost = await this.postRepository.save(post);
    return savedPost;
  }

  getPosts() {
    return this.postRepository.find({
      relations: ['user', 'user.profile'],
    });
  }
}
