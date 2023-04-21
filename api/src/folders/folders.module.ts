import { forwardRef, Module } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FoldersController } from './folders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FolderSchema } from './folder.schema';
import { NotesModule } from '../notes/notes.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Folder', schema: FolderSchema }]),
    forwardRef(() => NotesModule),
  ],
  providers: [FoldersService],
  exports: [FoldersService],
  controllers: [FoldersController],
})
export class FoldersModule {}
