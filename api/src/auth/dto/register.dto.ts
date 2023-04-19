import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsNotEmpty()
  @MinLength(5)
  @IsString()
  @ApiProperty({
    description: 'Username',
    type: String,
  })
  readonly username: string;

  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  @ApiProperty({
    description: 'Password',
    type: String,
  })
  readonly password: string;
}