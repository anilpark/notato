import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  SwaggerCreateNote,
  SwaggerEditNote,
  SwaggerGetNotes,
  SwaggerGetNotesInFolder,
} from '../common/decorators/swagger.decorators';
import { IPagination } from '../common/interfaces/pagination.interface';
import { NotesService } from './notes.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NoteDto } from './dto/note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@ApiTags('Notes')
@ApiBearerAuth('access_token')
@UseGuards(JwtAuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {
  }

  @SwaggerGetNotes()
  @Get('/')
  getAllNotes(@Request() req, @Query('skip') skip: IPagination['skip'], @Query('limit') limit: IPagination['limit']) {
    return this.notesService.getUserNotesNotInFolder(req.user._id, {
      skip,
      limit,
    });
  }

  @SwaggerGetNotesInFolder()
  @Get('/folder/:folderId')
  getNotesInFolder(@Request() req, @Param('folderId') folderId: string, @Query('skip') skip: IPagination['skip'], @Query('limit') limit: IPagination['limit']) {
    return this.notesService.getUserNotesInFolder(req.user._id, folderId, { skip, limit });
  }

  @SwaggerCreateNote()
  @Post('/create')
  createNote(@Request() req, @Body() body: NoteDto) {
    return this.notesService.create({
      ownerId: req.user._id,
      ...body,
    });
  }

  @SwaggerEditNote()
  @Patch('/edit/:id')
  editNote(@Request() req, @Body() body: UpdateNoteDto, @Param('id') id: string) {
    return this.notesService.editNote(id, body);
  }


  @Put('/:noteId/assign-tag/:tagId')
  assignTag(@Param('noteId') noteId: string, @Param('tagId') tagId: string) {
    return this.notesService.assignTagToNote(noteId, tagId);
  }

  @Put('/:noteId/move-to-folder/:folderId')
  moveToFolder(@Param('noteId') noteId: string, @Param('folderId') folderId: string) {
    return this.notesService.moveNoteIntoFolder(noteId, folderId);
  }

  @Delete('/:noteId/remove-tag/:tagId')
  removeTag(@Param('noteId') noteId: string, @Param('tagId') tagId: string) {
    return this.notesService.removeTagFromNote(noteId, tagId);
  }

  @Delete('/:noteId/remove-from-folder/:folderId')
  removeFromFolder(@Param('noteId') noteId: string, @Param('folderId') folderId: string) {
    return this.notesService.removeNoteFromFolder(noteId, folderId);
  }
}
