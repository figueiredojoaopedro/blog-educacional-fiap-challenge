import { Model } from "mongoose";
import { IPosts } from "src/posts/schemas/models/posts.interface";
import { PostsRepository } from "../posts.repository";
import { InjectModel } from "@nestjs/mongoose";
import { Post } from "src/posts/schemas/posts.schema";

export class PostsMongooseRepository implements PostsRepository {
  constructor(@InjectModel(Post.name) private readonly postModel: Model<Post>) {}

  async getAllPosts(limit: number, page: number): Promise<IPosts[]> {
    return await this.postModel.find().skip((page - 1) * limit).limit(limit).exec();
  }

  async getPost(postId: string): Promise<IPosts | null> {
    return await this.postModel.findById(postId).exec();
  }

  async createPost(post: IPosts): Promise<IPosts> {
    const newPost = new this.postModel({ ...post, createdAt: new Date().toISOString() });
    return await newPost.save();
  }

  async updatePost(postId: string, title: string, content: string): Promise<IPosts | null> {
    return await this.postModel.findByIdAndUpdate(
      postId,
      { title, content, updatedAt: new Date().toISOString() },
      { new: true },
    ).exec();
  }

  async deletePost(postId: string): Promise<void> {
    await this.postModel.findByIdAndDelete(postId).exec();
  }

  async searchPosts(query: string): Promise<IPosts[]> {
    return await this.postModel.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
      ],
    }).exec();
  }
}