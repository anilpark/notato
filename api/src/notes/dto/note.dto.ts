import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray } from 'class-validator';

export class NoteDto {
  @ApiProperty({
    description: 'Note title',
    required: false,
    type: String,
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: 'Note text',
    required: false,
    type: String,
  })
  @IsString()
  readonly text: string;

  @ApiProperty({
    description: 'Folder id',
    required: false,
    type: String,
  })

  readonly folderId: string;

  @ApiProperty({
    description: 'Tag ids',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  readonly tags: string[];
}