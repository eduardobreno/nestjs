import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Friend, FriendSchema } from './friend.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: Friend.name, schema: FriendSchema }])],
  providers: [FriendsService],
  exports: [FriendsService]
})
export class FriendsModule { }
