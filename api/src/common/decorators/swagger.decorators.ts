import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiPropertyOptional, ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { RegisterDto } from '../../auth/dto/register.dto';
import { LoginDto } from '../../auth/dto/login.dto';
import { NoteDto } from '../../notes/dto/note.dto';
import { UpdateNoteDto } from '../../notes/dto/update-note.dto';
import { TagDto } from '../../tags/dto/tag.dto';
import { FolderDto } from '../../folders/dto/folder.dto';

export const SwaggerRegister = () =>
  applyDecorators(
    ApiOperation({ summary: 'User registration' }),
    ApiBody({ type: RegisterDto }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'User registered successfully',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'User already exists',
    }),
  );

export const SwaggerLogin = () => applyDecorators(
  ApiOperation({ summary: 'User login' }),
  ApiBody({type: LoginDto}),
  ApiResponse({
    status: HttpStatus.OK,
    description: 'User logged in successfully',
  }),
  ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Invalid credentials' }),
  ApiBearerAuth('access_token')
);

export const SwaggerGetNotes = () => applyDecorators(
  ApiQuery({
    type: Number,
    name: 'skip',
    required: false,
    description: 'Number of skip items'
  }),
  ApiQuery({
    type: Number,
    required: false,
    name: 'limit',
    description: 'Number of max returned items'
  }),
  ApiOperation({ summary: 'Get notes not in folder' }),
  ApiResponse({
    status: HttpStatus.OK,
    description: 'Array of notes',
  }),
  ApiResponse({ status: HttpStatus.UNAUTHORIZED, }),
);

export const SwaggerGetNotesInFolder = () => applyDecorators(
  ApiQuery({
    type: Number,
    name: 'skip',
    required: false,
    description: 'Number of skip items'
  }),
  ApiQuery({
    type: Number,
    required: false,
    name: 'limit',
    description: 'Number of max returned items'
  }),
  ApiOperation({ summary: 'Get notes IN folder' }),
  ApiResponse({
    status: HttpStatus.OK,
    description: 'Array of notes',
  }),
  ApiResponse({ status: HttpStatus.UNAUTHORIZED, }),
);

export const SwaggerCreateNote = () => applyDecorators(
  ApiOperation({ summary: 'Create a note' }),
  ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created note',
  }),
  ApiBody({type: NoteDto}),
  ApiResponse({ status: HttpStatus.UNAUTHORIZED, }),
);

export const SwaggerEditNote = () => applyDecorators(
  ApiOperation({ summary: 'Edit a note' }),
  ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created note',
  }),
  ApiBody({type: UpdateNoteDto}),
  ApiResponse({ status: HttpStatus.UNAUTHORIZED, }),
);

export const SwaggerCreateTag = () => applyDecorators(
  ApiOperation({ summary: 'Create a tag' }),
  ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created tag',
  }),
  ApiBody({type: TagDto}),
  ApiResponse({ status: HttpStatus.UNAUTHORIZED, }),
);

export const SwaggerGetTags = () => applyDecorators(
  ApiOperation({ summary: 'Get user tags' }),
  ApiResponse({
    status: HttpStatus.OK,
    description: 'Tags list',
  }),
  ApiResponse({ status: HttpStatus.UNAUTHORIZED, }),
);

export const SwaggerDeleteTag = () => applyDecorators(
  ApiOperation({ summary: 'Delete tag' }),
  ApiResponse({
    status: HttpStatus.OK,
    description: 'Deleted tag',
  }),
  ApiResponse({ status: HttpStatus.UNAUTHORIZED, }),
);

export const SwaggerGetFolders = () => applyDecorators(
  ApiQuery({
    type: Number,
    name: 'skip',
    required: false,
    description: 'Number of skip folders'
  }),
  ApiQuery({
    type: Number,
    required: false,
    name: 'limit',
    description: 'Number of max returned folders'
  }),
  ApiOperation({ summary: 'Get folders' }),
  ApiResponse({
    status: HttpStatus.OK,
    description: 'Array of folders',
  }),
  ApiResponse({ status: HttpStatus.UNAUTHORIZED, }),
);

export const SwaggerCreateFolder = () => applyDecorators(
  ApiOperation({ summary: 'Create a folder' }),
  ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created folder',
  }),
  ApiBody({type: FolderDto}),
  ApiResponse({ status: HttpStatus.UNAUTHORIZED, }),
);

export const SwaggerDeleteFolder = () => applyDecorators(
  ApiOperation({ summary: 'Delete folder' }),
  ApiResponse({
    status: HttpStatus.OK,
  }),
  ApiResponse({ status: HttpStatus.UNAUTHORIZED, }),
);