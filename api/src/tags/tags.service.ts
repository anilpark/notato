import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag } from './tag.interface';
import { TagDto } from './dto/tag.dto';
import { NotesService } from '../notes/notes.service';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel('Tag') private tagModel: Model<Tag>,
    @Inject(forwardRef(() => NotesService))
    private readonly notesService: NotesService,
  ) {}

  async deleteTag(_id: string): Promise<void> {
    const result = await this.tagModel.deleteOne({ _id });
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Tag not found`);
    }

    await this.notesService.removeTagFromAllNotes(_id);
  }

  async getById(id: string): Promise<Tag> {
    return this.tagModel.findById(id);
  }

  async getUserTags(ownerId: string) {
    return this.tagModel.find({
      ownerId,
    });
  }

  async create(tag: Partial<Tag>): Promise<Tag> {
    const newTag = await this.tagModel.create(tag);
    return newTag.save();
  }

  async editTag(id: string, updateTagDto: TagDto): Promise<Tag> {
    const updatedTag = await this.tagModel.findByIdAndUpdate(id, updateTagDto, {
      new: true,
    });
    if (!updatedTag) {
      throw new NotFoundException(`Note not found`);
    }
    return updatedTag;
  }
}
