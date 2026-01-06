import { Model } from "mongoose";
import { IPosts } from "src/posts/schemas/models/posts.interface";
import { PostsRepository } from "../posts.repository";
import { Post } from "src/posts/schemas/posts.schema";
export declare class PostsMongooseRepository implements PostsRepository {
    private readonly postModel;
    constructor(postModel: Model<Post>);
    getAllPosts(limit: number, page: number): Promise<IPosts[]>;
    getPost(postId: string): Promise<IPosts | null>;
    createPost(post: IPosts): Promise<IPosts>;
    updatePost(postId: string, title: string, content: string): Promise<IPosts | null>;
    deletePost(postId: string): Promise<void>;
    searchPosts(query: string): Promise<IPosts[]>;
}
