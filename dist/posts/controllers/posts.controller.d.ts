import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    getPosts(limit?: number, page?: number): Promise<import("../schemas/models/posts.interface").IPosts[]>;
    searchPosts(query: string): Promise<import("../schemas/models/posts.interface").IPosts[]>;
    getPost(id: string): Promise<import("../schemas/models/posts.interface").IPosts>;
    createPost(createPostDto: CreatePostDto): Promise<import("../schemas/models/posts.interface").IPosts>;
    updatePost(id: string, updatePostDto: UpdatePostDto): Promise<import("../schemas/models/posts.interface").IPosts>;
    deletePost(id: string): Promise<{
        message: string;
    }>;
}
