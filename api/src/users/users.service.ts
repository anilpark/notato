import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.interface';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private userModel: Model<User>) {}

    async create(user: Partial<User>): Promise<User> {
        const newUser = new this.userModel(user);
        return newUser.save();
    }

    async findById(id: string): Promise<User | undefined> {
        return this.userModel.findById(id).exec();
    }

    async findByUsername(username: string): Promise<User | undefined> {
        return this.userModel.findOne({ username: username.toLowerCase() }).exec();
    }

    async isUsernameAvailable(username: string): Promise<boolean>{
        return !Boolean(await this.findByUsername(username));
    }
}