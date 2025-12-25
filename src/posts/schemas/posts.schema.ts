
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IPosts } from "./models/posts.interface";
import mongoose, { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post implements IPosts {
  @Prop({type: mongoose.Schema.Types.ObjectId })
  id: string;
  @Prop()
  title: string;
  @Prop()
  content: string;
  @Prop()
  author: string;
  @Prop()
  createdAt?: string | undefined;
  @Prop()
  updatedAt?: string | undefined;  
}

export const PostSchema = SchemaFactory.createForClass(Post);