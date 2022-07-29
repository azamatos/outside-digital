import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsString, Length } from 'class-validator';
import { UserEntity } from '../entities/users.entity';
import { UserTagEntity } from '../entities/usertags.entity';
import { CreateTagDto } from './create-tag.dto';

export class UpdateTagDto extends PartialType(CreateTagDto) {
  id: number;

  @ApiProperty({
    description: 'The username of creator',
    example: 'iGwT',
  })
  creator: string;

  @IsString()
  @IsEmpty({ message: 'Please enter the name' })
  @Length(40)
  @ApiProperty({
    description: 'The tag name',
    example: 'Dota 2',
  })
  name!: string;

  creatorId: UserEntity;

  userTags: UserTagEntity[];

  @ApiProperty({
    description: 'The order number to sort tags',
    example: 2,
  })
  sortOrder: number;
}
