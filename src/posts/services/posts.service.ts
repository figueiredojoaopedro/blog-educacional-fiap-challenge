import { Inject, Injectable } from '@nestjs/common';
import { PostsRepository } from '../repositories/posts.repository';
import { IPosts } from '../schemas/models/posts.interface';

@Injectable()
export class PostsService {
  constructor(@Inject(PostsRepository) private readonly postsRepository: PostsRepository) {}

  async getAllPosts(limit: number, page: number): Promise<IPosts[]> {
    return this.postsRepository.getAllPosts(limit, page);
  }

  async getPost(postId: string): Promise<IPosts | null> {
    return this.postsRepository.getPost(postId);
  }

  async createPost(post: IPosts): Promise<IPosts> {
    return this.postsRepository.createPost({ ...post, createdAt: new Date().toISOString() });
  }

  async updatePost(postId: string, title: string, content: string): Promise<IPosts | null> {
    return this.postsRepository.updatePost(postId, title, content);
  }

  async deletePost(postId: string): Promise<void> {
    return this.postsRepository.deletePost(postId);
  }

  async searchPosts(query: string): Promise<IPosts[]> {
    return this.postsRepository.searchPosts(query);
  }
}
