import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note } from './note.interface';
import { IPagination } from '../common/interfaces/pagination.interface';
import { UpdateNoteDto } from './dto/update-note.dto';
import { TagsService } from '../tags/tags.service';
import { FoldersService } from '../folders/folders.service';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel('Note') private noteModel: Model<Note>,
    @Inject(forwardRef(() => TagsService)) private readonly tagsService: TagsService,
    @Inject(forwardRef(() => FoldersService)) private readonly foldersService: FoldersService) {
  }

  async create(note: Partial<Note>): Promise<Note> {
    const newNote = await this.noteModel.create(note);
    if(note.folderId){
      await this.foldersService.updateFolderNotesCount(newNote._id, 1)
    }
    return newNote.save();
  }

  async editNote(id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const updatedNote = await this.noteModel.findByIdAndUpdate(id, updateNoteDto, { new: true });
    if (!updatedNote) {
      throw new NotFoundException(`Note not found`);
    }
    return updatedNote;
  }

  async getUserNotesNotInFolder(ownerId: string, { skip = 0, limit = 10 }: IPagination = { skip: 0, limit: 10 }) {
    return this.noteModel.find({
      ownerId,
      folderId: null,
    }).skip(skip).limit(limit);
  }

  async getUserNotesInFolder(ownerId: string, folderId: string, { skip = 0, limit = 10 }: IPagination = { skip: 0, limit: 10 }) {
    return this.noteModel.find({
      ownerId,
      folderId,
    }).skip(skip).limit(limit);
  }

  async assignTagToNote(noteId: string, tagId: string) {
    const existingTag = await this.tagsService.getById(tagId);

    if (!existingTag) {
      throw new NotFoundException(`Tag not found`);
    }

    const updatedNote = await this.noteModel.findByIdAndUpdate(
      noteId,
      {
        $addToSet: {
          tags: tagId,
        },
      },
      { new: true },
    );

    if (!updatedNote) {
      throw new NotFoundException(`Note not found`);
    }

    return updatedNote;
  }

  async removeTagFromNote(noteId: string, tagId: string) {
    const existingTag = await this.tagsService.getById(tagId);

    if (!existingTag) {
      throw new NotFoundException(`Tag not found`);
    }

    const updatedNote = await this.noteModel.findByIdAndUpdate(
      noteId,
      {
        $pull: { tags: tagId }
      },
      { new: true },
    );

    if (!updatedNote) {
      throw new NotFoundException(`Note not found`);
    }

    return updatedNote;
  }

  async removeTagFromAllNotes(tagId: string): Promise<void> {
    await this.noteModel.updateMany(
      { tags: { $in: [tagId] } },
      { $pull: { tags: tagId } },
    );
  }

  async moveNoteIntoFolder(noteId: string, folderId: string){
    const existingFolder = await this.foldersService.getById(folderId);

    if (!existingFolder) {
      throw new NotFoundException(`Folder not found`);
    }

    const updatedNote = await this.noteModel.findByIdAndUpdate(
      noteId,
      {
        folderId,
      },
      { new: true },
    );

    if (!updatedNote) {
      throw new NotFoundException(`Note not found`);
    }

    await this.foldersService.updateFolderNotesCount(folderId, 1)

    return updatedNote;
  }


  async removeNoteFromFolder(noteId: string, folderId: string) {
    const existingFolder = await this.foldersService.getById(folderId);

    if (!existingFolder) {
      throw new NotFoundException(`Folder not found`);
    }

    const updatedNote = await this.noteModel.findByIdAndUpdate(
      noteId,
      {
        folderId: null
      },
      { new: true },
    );

    if (!updatedNote) {
      throw new NotFoundException(`Note not found`);
    }

    await this.foldersService.updateFolderNotesCount(folderId, -1)

    return updatedNote;
  }

  async removeAllNotesFromFolder(folderId: string): Promise<void> {
    await this.noteModel.updateMany(
      { folderId },
      { folderId: null },
    );
  }
}
