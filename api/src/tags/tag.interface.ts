import { Document } from 'mongoose';
import { User } from '../users/user.interface';

export interface Tag extends Document {
  readonly text: string;
  readonly ownerId: User['_id'];
}