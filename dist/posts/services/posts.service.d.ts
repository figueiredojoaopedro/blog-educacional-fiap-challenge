import { PostsRepository } from '../repositories/posts.repository';
import { IPosts } from '../schemas/models/posts.interface';
export declare class PostsService {
    private readonly postsRepository;
    constructor(postsRepository: PostsRepository);
    getAllPosts(limit: number, page: number): Promise<IPosts[]>;
    getPost(postId: string): Promise<IPosts | null>;
    createPost(post: IPosts): Promise<IPosts>;
    updatePost(postId: string, title: string, content: string): Promise<IPosts | null>;
    deletePost(postId: string): Promise<void>;
    searchPosts(query: string): Promise<IPosts[]>;
}
