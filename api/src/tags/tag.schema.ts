import mongoose from 'mongoose';
import { Tag } from './tag.interface';

export const TagSchema = new mongoose.Schema<Tag>(
  {
    text: { type: String, required: true },
    ownerId: String,
  },
  {
    timestamps: true,
  },
);
