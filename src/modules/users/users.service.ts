import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './user.model';


@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

    async create(body: User): Promise<User | boolean> {

        if (await this.findByUsernameOrEmail(body.email) ||
            await this.findByUsernameOrEmail(body.username)) return false
        const createdCat = new this.userModel(body);
        return createdCat.save();
    }

    async update(id: string, model: User): Promise<User> {
        const { email, ...newModel } = model
        return await this.userModel.findByIdAndUpdate(id, newModel, { new: true });
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findByIdOrEmail(id: string): Promise<User | boolean> {
        let _id = Types.ObjectId.createFromTime(0)
        if (Types.ObjectId.isValid(id)) _id = Types.ObjectId(id)

        const exists = await this.userModel.findOne({ $or: [{ email: id }, { _id }] }).exec();
        if (exists) return exists

        return false
    }

    async findByUsernameOrEmail(username: string): Promise<User | boolean> {
        const exists = await this.userModel.findOne({ $or: [{ email: username }, { username }] }).exec();
        if (exists) return exists
        return false
    }

    async findByUsernameAndPassword(username: string, password: string): Promise<User | boolean> {
        const exists = await this.userModel.findOne({ $or: [{ email: username }, { username }], password: password }).exec();
        if (exists) return exists
        return false
    }
}
