import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FolderDto {
  @ApiProperty({
    description: 'Folder title',
    required: false,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  readonly title: string;
}
