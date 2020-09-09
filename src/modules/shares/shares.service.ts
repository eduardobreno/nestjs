import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UsersService } from 'src/modules/users/users.service';
import { IFile } from 'src/commons/decorators/UploadFile.decorator';
import { Share } from './share.model';


@Injectable()
export class SharesService {
    constructor(@InjectModel(Share.name) private readonly model: Model<Share>, private readonly usersService: UsersService) { }


    async findById(id: string): Promise<IFile> {
        let _id = Types.ObjectId.createFromTime(0)
        if (Types.ObjectId.isValid(id)) _id = Types.ObjectId(id)

        const user = await this.model.findById(_id).exec();
        if (user) return user

        return undefined
    }

    async sendFile(from: string, to: string, file: IFile): Promise<any> {

        const user = await this.usersService.findByIdOrEmail(from)
        if (user === undefined) return undefined
        const friend = await this.usersService.findByUsername(to)
        if (friend === undefined) return undefined

        console.log("User", user)
        console.log("Friend", friend)
        console.log("file", file)

        return true

    }

}
