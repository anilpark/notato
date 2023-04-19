import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Folder } from './folder.interface';
import { IPagination } from '../common/interfaces/pagination.interface';
import { NotesService } from '../notes/notes.service';
import { FolderDto } from './dto/folder.dto';

@Injectable()
export class FoldersService {
  constructor(
    @InjectModel('Folder') private folderModel: Model<Folder>,
    @Inject(forwardRef(() => NotesService)) private readonly notesService: NotesService) {
  }

  async getById(id: string): Promise<Folder> {
    return this.folderModel.findById(id);
  }

  async createFolder(folder: Partial<Folder>): Promise<Folder> {
    const newFolder = await this.folderModel.create(folder);
    return newFolder.save();
  }

  async getAllUserFolders(ownerId: string, { skip = 0, limit = 10 }: IPagination = { skip: 0, limit: 10 }) {
    return this.folderModel.find({
      ownerId,
    }).skip(skip).limit(limit);
  }

  async editFolder(id: string, updateFolderDto: FolderDto): Promise<Folder> {
    const updatedFolder = await this.folderModel.findByIdAndUpdate(id, updateFolderDto, { new: true });
    if (!updatedFolder) {
      throw new NotFoundException(`Folder not found`);
    }
    return updatedFolder;
  }

  async updateFolderNotesCount(folderId: string, incrementValue: number) {
    await this.folderModel.findByIdAndUpdate(
      folderId,
      { $inc: { notesCount: incrementValue } },
    );
  }


  async deleteFolder(_id: string): Promise<void> {
    const result = await this.folderModel.deleteOne({ _id });
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Folder not found`);
    }

    await this.notesService.removeAllNotesFromFolder(_id);
  }
}
