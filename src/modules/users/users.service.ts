import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './user.model';


@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

    async create(body: User): Promise<User> {
        if (await this.findByUsernameOrEmail(body.email) ||
            await this.findByUsernameOrEmail(body.username)) return undefined
        return new this.userModel(body).save();
    }

    async update(id: string, model: User): Promise<User> {
        const { email, ...newModel } = model
        return await this.userModel.findByIdAndUpdate(id, newModel, { new: true });
    }

    async updatePhoto(id: string, photo: string): Promise<User> {
        const user = await this.findByIdOrEmail(id)
        if (user === undefined) return undefined
        const model = user as User
        model.photo = photo
        return await this.userModel.findByIdAndUpdate(id, model, { new: true });
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findByIdOrEmail(id: string): Promise<User> {
        let _id = Types.ObjectId.createFromTime(0)
        if (Types.ObjectId.isValid(id)) _id = Types.ObjectId(id)

        const user = await this.userModel.findOne({ $or: [{ email: id }, { _id }] }).exec();
        if (user) return user

        return undefined
    }

    async findByUsernameOrEmail(username: string): Promise<User> {
        const user = await this.userModel.findOne({ $or: [{ email: username }, { username }] }).exec();
        if (user) return user
        return undefined
    }

    async findByUsernameAndPassword(username: string, password: string): Promise<User> {
        const user = await this.userModel.findOne({ $or: [{ email: username }, { username }], password: password }).exec();
        if (user) return user
        return undefined
    }
}
