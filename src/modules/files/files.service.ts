import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { unlinkSync } from 'fs';
import { UsersService } from 'src/modules/users/users.service';
import { File } from './file.model';
import { IFile } from 'src/commons/decorators/UploadFile.decorator';


@Injectable()
export class FilesService {
    constructor(@InjectModel(File.name) private readonly model: Model<File>, private readonly usersService: UsersService) { }

    async create(file: File): Promise<File> {
        const exists = await this.findById(file.id)
        if (exists) {
            try {
                unlinkSync(`${exists.destination}/${exists.filename}`)
            } catch (error) {
                console.error(`Error to unlink file ${exists.destination}/${exists.filename}`, error)
            }
        }
        return await this.model.findByIdAndUpdate(file.id, file, { new: true, upsert: true }) as File;
    }


    async findById(id: string): Promise<File> {
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
