import { Body, Controller, Delete, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { SwaggerCreateFolder, SwaggerDeleteFolder, SwaggerGetFolders } from '../common/decorators/swagger.decorators';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IPagination } from '../common/interfaces/pagination.interface';
import { FolderDto } from './dto/folder.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Folders')
@ApiBearerAuth('access_token')
@UseGuards(JwtAuthGuard)
@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {
  }

  @SwaggerGetFolders()
  @Get('/')
  getAllFolders(@Request() req, @Query('skip') skip: IPagination['skip'], @Query('limit') limit: IPagination['limit']) {
    return this.foldersService.getAllUserFolders(req.user._id, {
      skip,
      limit,
    });
  }

  @SwaggerCreateFolder()
  @Post('/create')
  createFolder(@Request() req, @Body() body: FolderDto) {
    return this.foldersService.createFolder({
      ownerId: req.user._id,
      ...body,
    });
  }

  @SwaggerDeleteFolder()
  @Delete('/:id')
  deleteFolder(@Param('id') id: string) {
    return this.foldersService.deleteFolder(id);
  }
}
