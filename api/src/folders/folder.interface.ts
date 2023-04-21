import { Document } from 'mongoose';
import { User } from '../users/user.interface';

export interface Folder extends Document {
  readonly title: string;
  readonly ownerId: User['_id'];
  readonly notesCount: number;
}
