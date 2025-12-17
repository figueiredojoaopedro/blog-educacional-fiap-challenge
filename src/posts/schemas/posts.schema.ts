
import { IPosts } from "./models/posts.interface";

export class Post implements IPosts {
  id?: string | undefined;
  title: string;
  content: string;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;  
}