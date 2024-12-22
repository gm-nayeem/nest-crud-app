import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostService) {}

  @Post(':userId')
  createPost(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postService.createPost(userId, createPostDto);
  }

  @Get()
  getPost() {
    return this.postService.getPosts();
  }
}
