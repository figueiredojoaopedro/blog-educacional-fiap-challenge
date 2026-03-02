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
  UseGuards,
  Logger,
} from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { GetUser } from '../../auth/decorators/get-user.decorator';

@Controller('posts')
export class PostsController {
  private readonly logger = new Logger(PostsController.name);

  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getPosts(@Query('limit') limit = 10, @Query('page') page = 1) {
    this.logger.log(`Fetching posts: limit=${limit}, page=${page}`);
    return this.postsService.getAllPosts(Number(limit), Number(page));
  }

  @Get('search')
  async searchPosts(@Query('q') query: string) {
    this.logger.log(`Searching posts with query: "${query}"`);
    return this.postsService.searchPosts(query);
  }

  @Get(':id')
  async getPost(@Param('id') id: string) {
    this.logger.log(`Fetching post with ID: ${id}`);
    const post = await this.postsService.getPost(id);
    if (!post) {
      this.logger.warn(`Post with ID "${id}" not found`);
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }
    return post;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(@Body() createPostDto: CreatePostDto, @GetUser() user: any) {
    this.logger.log(`Creating new post by user: ${user.email}`);
    return this.postsService.createPost({
      title: createPostDto.title,
      content: createPostDto.content,
      author: user.email,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    this.logger.log(`Updating post ID: ${id}`);
    const updatedPost = await this.postsService.updatePost(
      id,
      updatePostDto.title!,
      updatePostDto.content!,
    );
    if (!updatedPost) {
      this.logger.warn(`Failed to update: Post with ID "${id}" not found`);
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }
    return updatedPost;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    this.logger.log(`Deleting post ID: ${id}`);
    await this.postsService.deletePost(id);
    return { message: `Post with ID "${id}" has been deleted` };
  }
}
