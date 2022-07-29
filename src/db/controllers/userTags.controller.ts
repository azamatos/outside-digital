import { Body, Controller, Delete, Param, Post, Req } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import schemaExamples from '../models/schema-examples';

import { UserTagService } from '../services/usertags.service';

@ApiTags('User tags')
@Controller('/')
export class UserTagsController {
  constructor(private userTagService: UserTagService) {}

  @Post('user/tag')
  @ApiOperation({ summary: 'Add tags to user' })
  @ApiBody({
    schema: {
      example: { tags: [1, 2] },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Tags added by user response',
    schema: { example: schemaExamples.userTags },
  })
  @ApiBearerAuth('access-token')
  async createTag(@Req() request: Request, @Body() tagIds): Promise<object> {
    const { authorization } = request.headers;
    const { tags } = tagIds;
    const result = await this.userTagService.createUserTag(authorization, tags);

    return {
      tags: result,
    };
  }

  @Delete('user/tag/:id')
  @ApiOperation({ summary: 'Delete added tags' })
  @ApiResponse({
    status: 200,
    description: 'Tags added by user response',
    schema: { example: schemaExamples.userTags },
  })
  @ApiBearerAuth('access-token')
  async deleteTag(
    @Req() request: Request,
    @Param('id') id: number,
  ): Promise<object> {
    const { authorization } = request.headers;
    const result = await this.userTagService.deleteUserTag(authorization, id);

    return {
      tags: result,
    };
  }
}
