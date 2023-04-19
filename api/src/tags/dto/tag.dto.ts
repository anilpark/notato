import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class TagDto {
  @ApiProperty({
    description: 'Tag text',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  readonly text: string;
}