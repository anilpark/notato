import mongoose from 'mongoose';
import { Note } from './note.interface';

export const NoteSchema = new mongoose.Schema<Note>({
  title: { type: String, default: '' },
  ownerId: String,
  text: { type: String, default: '' },
  folderId: String,
  tags: {type: [String], default: []}
}, {
  timestamps: true,
});