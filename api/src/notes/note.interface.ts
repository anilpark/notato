import { Document } from 'mongoose';
import { User } from '../users/user.interface';
import { Tag } from '../tags/tag.interface';
import { Folder } from '../folders/folder.interface';

export interface Note extends Document {
  readonly title: string;
  readonly text: string;
  readonly ownerId: User['_id'];
  readonly tags: Tag['_id'][];
  readonly folderId: Folder['_id'] | null;
}