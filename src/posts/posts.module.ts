import { Module } from '@nestjs/common';
import { PostsController } from './controllers/posts.controller';
import { PostsService } from './services/posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schemas/posts.schema';
import { PostsMongooseRepository } from './repositories/mongoose/posts.mongoose.repository';
import { PostsRepository } from './repositories/posts.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }])
  ],
  controllers: [PostsController],
  providers: [
    PostsService,
    {
      provide: PostsRepository,
      useClass: PostsMongooseRepository
    }
  ]
})
export class PostsModule {}
