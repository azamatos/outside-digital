import { Module } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UsersController } from '../controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { Token } from '../entities/token.entity';
import { UserTagEntity } from '../entities/usertags.entity';
import { TagEntity } from '../entities/tags.entity';
import { TagsController } from '../controllers/tags.controller';
import { TagsService } from '../services/tags.service';
import { UserTagService } from '../services/usertags.service';
import { UserTagsController } from '../controllers/userTags.controller';
import { TokenController } from '../controllers/token.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, Token, UserTagEntity, TagEntity]),
    JwtModule.register({
      secret: '${ process.env.STK }',
      signOptions: {
        expiresIn: '30min',
      },
    }),
  ],
  controllers: [
    UsersController,
    TagsController,
    UserTagsController,
    TokenController,
  ],
  providers: [UsersService, TagsService, UserTagService],
})
export class UsersModule {}
