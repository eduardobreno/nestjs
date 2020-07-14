import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Friend, FriendSchema } from './friend.model';
import { FriendsController } from './friends.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Friend.name, schema: FriendSchema }]), UsersModule],
  providers: [FriendsService],
  controllers: [FriendsController],
  exports: [FriendsService]
})
export class FriendsModule { }
