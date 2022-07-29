import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { UserEntity } from '../entities/users.entity';
import { UserTagEntity } from '../entities/usertags.entity';

export class CreateTagDto {
  id: number;

  creator: string;

  @IsString()
  @Length(3, 40)
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
