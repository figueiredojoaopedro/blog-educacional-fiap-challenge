import { IPosts } from '../schemas/models/posts.interface';

export abstract class PostsRepository {
  abstract getAllPosts(limit: number, page: number): Promise<IPosts[]>;
  abstract getPost(postId: string): Promise<IPosts | null>;
  abstract createPost(post: IPosts): Promise<IPosts>;
  abstract updatePost(
    postId: string,
    title: string,
    content: string,
  ): Promise<IPosts | null>;
  abstract deletePost(postId: string): Promise<void>;
  abstract searchPosts(query: string): Promise<IPosts[]>;
}
