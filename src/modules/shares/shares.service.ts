import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UsersService } from 'src/modules/users/users.service';
import { IFile } from 'src/commons/decorators/UploadFile.decorator';
import { removeFile } from 'src/commons/helpers/file.helpers';
import { Share } from './share.model';
import { FriendsService } from '../friends/friends.service';



@Injectable()
export class SharesService {
    constructor(@InjectModel(Share.name) private readonly model: Model<Share>,
        private readonly usersService: UsersService,
        private readonly friendsService: FriendsService) { }


    async findSharedToUserId(id: string): Promise<IFile> {
        if (!Types.ObjectId.isValid(id)) return undefined

        const shared = await this.model.find({ to: Types.ObjectId(id) }).exec();
        if (shared) return shared

        return undefined
    }

    async findSharedFromUserId(id: string): Promise<IFile> {
        if (!Types.ObjectId.isValid(id)) return undefined

        const shared = await this.model.find({ from: Types.ObjectId(id) }).exec();
        if (shared) return shared

        return undefined
    }

    async findById(id: string): Promise<IFile> {
        if (!Types.ObjectId.isValid(id)) return undefined

        const file = await this.model.findById(Types.ObjectId(id)).exec();
        if (file) return file

        return undefined
    }

    async sendFile(from: Types.ObjectId, username: string, file: IFile): Promise<any> {

        const user = await this.usersService.findByIdOrEmail(from.toHexString())
        const friend = await this.usersService.findByUsername(username)
        const hasAccepted = await this.friendsService.hasAccepted(user._id, friend._id)

        if (user === undefined || friend === undefined || !hasAccepted) {
            await removeFile(`${file.destination}/${file.filename}`)
            return undefined
        }

        const model: Share = (await new this.model({ from: user._id, to: friend._id, file }).save()).toObject();
        delete model.file
        return model


    }

}
