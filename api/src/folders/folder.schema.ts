import mongoose from 'mongoose';
import { Folder } from './folder.interface';

export const FolderSchema = new mongoose.Schema<Folder>({
  title: { type: String, required: true },
  ownerId: String,
  notesCount: {type: Number, default: 0},
}, {
  timestamps: true,
});