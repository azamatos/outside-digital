import { BadRequestException, Controller, Get, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtInterface, TokenInterface } from '../interfaces/token.interface';
import schemaExamples from '../models/schema-examples';

@Controller('/')
export class TokenController {
  constructor(private jwtService: JwtService) {}

  @ApiTags('token')
  @Get('refreshToken')
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 200,
    description: 'Token response',
    schema: { example: schemaExamples.tokenResponse },
  })
  async createTag(@Req() request: Request): Promise<TokenInterface> {
    const { authorization } = request.headers;
    const bearer = authorization.substr(7, authorization.length - 7);
    try {
      const { id: userId }: JwtInterface = await this.jwtService.verifyAsync(
        bearer,
      );
      const newToken = await this.jwtService.signAsync({ id: userId });
      return {
        token: newToken,
        expire: 1800,
      };
    } catch {
      throw new BadRequestException('Invalid token');
    }
  }
}
