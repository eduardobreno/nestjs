import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Friend } from './friend.model';

@Injectable()
export class FriendsService {
    constructor(@InjectModel(Friend.name) private readonly model: Model<Friend>) { }

    async saveRequest(userId: Types.ObjectId, friendId: Types.ObjectId): Promise<Friend> {
        const exists = await this.find(userId, friendId)
        if (exists) return exists
        return new this.model({ userId, friendId }).save();
    }

    async find(userId: Types.ObjectId, friendId: Types.ObjectId): Promise<Friend> {
        const result = await this.model.findOne({
            $or: [
                { $and: [{ userId }, { friendId }] },
                { $and: [{ userId: friendId }, { friendId: userId }] }
            ]
        }).exec();
        return result
    }

}
