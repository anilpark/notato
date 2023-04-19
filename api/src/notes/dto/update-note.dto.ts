import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateNoteDto {
  @ApiProperty({
    description: 'New note title',
    required: false,
    type: String,
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: 'New note text',
    required: false,
    type: String,
  })
  @IsString()
  readonly text: string;
}