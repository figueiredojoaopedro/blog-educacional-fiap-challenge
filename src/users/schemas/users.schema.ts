import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IUser } from './models/users.interface';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User implements IUser {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password?: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, default: 'professor' })
  role: 'professor' | 'student';
}

export const UserSchema = SchemaFactory.createForClass(User);
