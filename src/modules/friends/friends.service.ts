import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Friend } from './friend.model';
import { FriendshipStatus } from 'src/commons/constants';
import { UsersService } from '../users/users.service';
import { ListFriendsDto } from './payloads/list-friends.dto';
import { User } from '../users/user.model';
import { IFile } from 'src/commons/decorators/UploadFile.decorator';

@Injectable()
export class FriendsService {
    constructor(@InjectModel(Friend.name) private readonly model: Model<Friend>, private readonly usersService: UsersService) { }

    async requestFriend(userId: string, username: string): Promise<Friend> {
        const friend = await this.usersService.findByUsername(username)
        const user = await this.usersService.findByIdOrEmail(userId)

        const exists = await this.findFriendship(user._id, friend._id)
        if (exists) return exists
        return new this.model({ userId, friendId: friend._id }).save();
    }

    async findFriendship(userId: Types.ObjectId, friendId: Types.ObjectId): Promise<Friend> {
        const result = await this.model.findOne({
            $or: [
                { $and: [{ userId }, { friendId }] },
                { $and: [{ userId: friendId }, { friendId: userId }] }
            ]
        }).exec();
        return result
    }

    async findAll(userId: Types.ObjectId): Promise<ListFriendsDto[]> {
        const populateQuery = [
            { path: 'userId', select: '-email' },
            { path: 'friendId', select: '-email' }
        ];

        const result = await this.model.find({
            $or: [
                { userId },
                { friendId: userId }
            ],
            status: FriendshipStatus.ACCEPTED
        })
            .populate(populateQuery)
            .select(["userId", "friendId", "createdAt"])
            .exec();

        return result.map((item: Friend) => {
            let lf = new ListFriendsDto()
            const j = item.toObject()
            lf = userId.equals(j.userId.id) ? j.friendId : j.userId
            lf.createdAt = j.createdAt

            return lf
        })
    }

    async findPendingRequest(userId: Types.ObjectId): Promise<Friend[]> {
        const result = await this.model.find({ userId, status: FriendshipStatus.PENDING }).exec();
        return result
    }

    async changeFriendStatus(userId: string, action: FriendshipStatus, username: string): Promise<Friend> {
        const valid = Object.values(FriendshipStatus).includes(action.toUpperCase() as FriendshipStatus)
        if (!valid) return undefined
        if (action === FriendshipStatus.PENDING) return undefined

        const friend = await this.usersService.findByUsername(username)
        if (friend === undefined) return undefined

        const friendSituation = await this.model.findOne({ userId: Types.ObjectId(userId), friendId: friend._id }).exec() || undefined;

        if (friendSituation === undefined) return undefined

        const newModel = friendSituation.toObject()
        newModel.status = action
        return await this.model.findByIdAndUpdate(friendSituation._id, newModel, { new: true });

    }

}
