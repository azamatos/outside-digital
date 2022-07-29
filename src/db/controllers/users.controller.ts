import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Put,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { TokenInterface } from '../interfaces/token.interface';
import { UserInterface } from '../interfaces/users.interface';
import { UsersService } from '../services/users.service';
import schemaExamples from '../models/schema-examples';

@ApiTags('User')
@Controller('/')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('register')
  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({
    status: 201,
    description: 'Token response',
    schema: { example: schemaExamples.tokenResponse },
  })
  @UsePipes(ValidationPipe)
  async register(@Body() user: CreateUserDto): Promise<TokenInterface> {
    const jwt = await this.userService.register(user);
    return {
      token: jwt,
      expire: 1800,
    };
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({
    schema: {
      example: schemaExamples.loginResponse,
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Token response',
    schema: { example: schemaExamples.tokenResponse },
  })
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<TokenInterface> {
    const jwt = await this.userService.login(email, password);
    return {
      token: jwt,
      expire: 1800,
    };
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout user' })
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 200,
    description: 'Logout response',
    schema: { example: schemaExamples.successMessage },
  })
  @HttpCode(200)
  async logout(@Req() request: Request): Promise<object> {
    const { authorization } = request.headers;
    const result: boolean = await this.userService.logout(authorization);

    if (result) return schemaExamples.successMessage;
  }

  @Get('user')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get user and created tags' })
  @ApiResponse({
    status: 200,
    description: 'User data response',
    schema: {
      example: schemaExamples.userWithTags,
    },
  })
  @HttpCode(200)
  async getUser(@Req() request: Request): Promise<UserInterface> {
    const { authorization } = request.headers;
    return await this.userService.getUser(authorization);
  }

  @Put('user')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update user credentials' })
  @ApiResponse({
    status: 201,
    description: 'Token response',
    schema: { example: schemaExamples.tokenResponse },
  })
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async putUser(@Req() request: Request, @Body() user: UpdateUserDto) {
    const { authorization } = request.headers;
    return await this.userService.putUser(authorization, user);
  }

  @Delete('user')
  @ApiOperation({ summary: 'Delete user' })
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 200,
    description: 'Delete response',
    schema: { example: schemaExamples.successMessage },
  })
  @HttpCode(200)
  async deleteUser(@Req() request: Request) {
    const { authorization } = request.headers;
    const result: boolean = await this.userService.deleteUser(authorization);

    if (result) return schemaExamples.successMessage;
  }
}
