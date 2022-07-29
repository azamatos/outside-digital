import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { CreateTagDto } from '../dto/create-tag.dto';
import { UpdateTagDto } from '../dto/update-tag.dto';
import { TagEntity } from '../entities/tags.entity';
import { PaginationParams } from '../interfaces/pagination.interface';
import schemaExamples from '../models/schema-examples';
import { tagQuery } from '../models/tagQuery.model';
import { TagsService } from '../services/tags.service';

@ApiTags('Tag')
@Controller('/')
export class TagsController {
  constructor(private tagService: TagsService) {}

  @Post('tag')
  @ApiOperation({ summary: 'Tag creation' })
  @ApiResponse({
    status: 201,
    description: 'New tag response',
    schema: { example: schemaExamples.newTagResponse },
  })
  @ApiBearerAuth('access-token')
  @UsePipes(ValidationPipe)
  async createTag(
    @Req() request: Request,
    @Body() tag: CreateTagDto,
  ): Promise<TagEntity> {
    const { authorization } = request.headers;
    return await this.tagService.createTag(authorization, tag);
  }

  @Get('tag/:id')
  @ApiOperation({ summary: 'Get user tag' })
  @ApiResponse({
    status: 200,
    description: 'User tag response',
    schema: { example: schemaExamples.userTagResponse },
  })
  @ApiBearerAuth('access-token')
  @HttpCode(200)
  async getTag(@Req() request: Request, @Param('id') id: number) {
    const { authorization } = request.headers;
    return await this.tagService.getTag(authorization, id);
  }

  @Get('tag')
  @ApiOperation({ summary: 'Get tags with params' })
  @ApiResponse({
    status: 200,
    description: 'User tags response',
    schema: { example: schemaExamples.userOwnTags },
  })
  @ApiBearerAuth('access-token')
  @ApiQuery({
    type: tagQuery,
  })
  async getTagsByQuery(
    @Req() request: Request,
    @Query() pagination: PaginationParams,
  ) {
    const { authorization } = request.headers;
    return this.tagService.getAllTags(authorization, pagination);
  }

  @Put('tag/:id')
  @ApiOperation({ summary: 'Update tag by id' })
  @ApiResponse({
    status: 200,
    description: 'Updated tag response',
    schema: { example: schemaExamples.tagUpdateResponse },
  })
  @ApiBearerAuth('access-token')
  @HttpCode(200)
  async putTag(
    @Req() request: Request,
    @Body() tag: UpdateTagDto,
    @Param('id') id: number,
  ) {
    const { authorization } = request.headers;
    return await this.tagService.putUser(authorization, tag, id);
  }

  @Delete('tag/:id')
  @ApiOperation({ summary: 'Update tag by id' })
  @ApiResponse({
    status: 200,
    description: 'Deleted tag response',
    schema: { example: schemaExamples.successMessage },
  })
  @ApiBearerAuth('access-token')
  @HttpCode(200)
  async deleteTag(@Req() request: Request, @Param('id') id: number) {
    const { authorization } = request.headers;
    const result: boolean = await this.tagService.deleteTag(authorization, id);

    if (result) return schemaExamples.successMessage;
  }
  @Get('user/tag/my')
  @ApiOperation({ summary: `Get creator's tags` })
  @ApiResponse({
    status: 200,
    description: `Creator's tags`,
    schema: { example: schemaExamples.userTags },
  })
  @ApiBearerAuth('access-token')
  @HttpCode(200)
  async getOwnTags(@Req() request: Request) {
    const { authorization } = request.headers;
    const result = await this.tagService.getOwnTags(authorization);
    return {
      tags: result,
    };
  }
}
