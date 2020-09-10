import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/modules/users/users.module';
import { FriendsModule } from 'src/modules/friends/friends.module';
import { Share, ShareSchema } from './share.model';
import { SharesController } from './shares.controller';
import { SharesService } from './shares.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Share.name, schema: ShareSchema }]), UsersModule, FriendsModule],
  controllers: [SharesController],
  providers: [SharesService],
  exports: [SharesService]
})
export class SharesModule { }
