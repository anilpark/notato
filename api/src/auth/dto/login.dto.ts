import { IsNotEmpty, MinLength, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
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
