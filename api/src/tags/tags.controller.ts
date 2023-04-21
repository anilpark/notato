import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  SwaggerCreateTag,
  SwaggerDeleteTag,
  SwaggerGetTags,
} from '../common/decorators/swagger.decorators';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TagDto } from './dto/tag.dto';
import { TagsService } from './tags.service';

@ApiTags('Tags')
@ApiBearerAuth('access_token')
@UseGuards(JwtAuthGuard)
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @SwaggerGetTags()
  @Get('/')
  getTags(@Request() req) {
    return this.tagsService.getUserTags(req.user._id);
  }

  @SwaggerCreateTag()
  @Post('/create')
  createTag(@Request() req, @Body() body: TagDto) {
    return this.tagsService.create({
      ownerId: req.user._id,
      ...body,
    });
  }

  @SwaggerDeleteTag()
  @Delete('/:id')
  deleteTag(@Param('id') id: string) {
    return this.tagsService.deleteTag(id);
  }
}
