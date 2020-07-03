import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { File } from './file.model';


@Injectable()
export class FilesService {
    constructor(@InjectModel(File.name) private readonly model: Model<File>) { }

    async create(file: File): Promise<File> {

        return new this.model(file).save();
    }


    async findById(id: string): Promise<File> {
        let _id = Types.ObjectId.createFromTime(0)
        if (Types.ObjectId.isValid(id)) _id = Types.ObjectId(id)

        const user = await this.model.findById(_id).exec();
        if (user) return user

        return undefined
    }

}
