import { forwardRef, Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteSchema } from './note.schema';
import { TagsModule } from '../tags/tags.module';
import { FoldersModule } from '../folders/folders.module';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Note', schema: NoteSchema
    }]),
    forwardRef(() => TagsModule),
    forwardRef(() => FoldersModule),
    ],
  controllers: [NotesController],
  providers: [NotesService],
  exports: [NotesService],
})
export class NotesModule {
}
