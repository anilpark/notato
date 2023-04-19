import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('check-username/:username')
  @ApiOperation({ summary: 'Check if a username is available' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The availability of the requested username',
  })
  async isUsernameAvailable(@Param('username') username: string): Promise<{ available: boolean }> {
    const isAvailable = await this.usersService.isUsernameAvailable(username);
    return { available: isAvailable };
  }
}