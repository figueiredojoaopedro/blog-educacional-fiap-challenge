import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getPosts(@Query('limit') limit = 10, @Query('page') page = 1) {
    // console.info('Get Posts', limit, page);
    return this.postsService.getAllPosts(Number(limit), Number(page));
  }

  @Get('search')
  async searchPosts(@Query('q') query: string) {
    // console.log('Get Posts Search', query);
    return this.postsService.searchPosts(query);
  }

  @Get(':id')
  async getPost(@Param('id') id: string) {
    const post = await this.postsService.getPost(id);
    if (!post) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }
    return post;
  }

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto) {
    // console.log('Create Post', createPostDto);

    return this.postsService.createPost({
      title: createPostDto.title,
      content: createPostDto.content,
      author: createPostDto.author,
    });
  }

  @Put(':id')
  async updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    // console.log('Update Post', id, updatePostDto);

    const updatedPost = await this.postsService.updatePost(
      id,
      updatePostDto.title!,
      updatePostDto.content!,
    );
    if (!updatedPost) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }
    return updatedPost;
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    // console.log('Delete Post', id);

    await this.postsService.deletePost(id);
    return { message: `Post with ID "${id}" has been deleted` };
  }
}
