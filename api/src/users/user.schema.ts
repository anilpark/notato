import mongoose from 'mongoose';
import { User } from './user.interface';

export const UserSchema = new mongoose.Schema<User>({
    username: { type: String, unique: true },
    password: String,
}, {
    timestamps: true,
});