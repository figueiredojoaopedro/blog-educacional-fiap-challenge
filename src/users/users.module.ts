import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/users.schema';
import { UsersService } from './services/users.service';
import { UsersRepository } from './repositories/users.repository';
import { UsersMongooseRepository } from './repositories/mongoose/users.mongoose.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    UsersService,
    {
      provide: UsersRepository,
      useClass: UsersMongooseRepository,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
