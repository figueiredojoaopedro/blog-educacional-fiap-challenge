import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IPosts } from './models/posts.interface';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true })
export class Post implements IPosts {
  @Prop()
  title: string;
  @Prop()
  content: string;
  @Prop()
  author: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
