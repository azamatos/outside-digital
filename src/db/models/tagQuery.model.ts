import { ApiProperty } from '@nestjs/swagger';

export class tagQuery {
  @ApiProperty({
    description: 'Sort tags by name',
    required: false,
    example: true,
  })
  sortByName: boolean;

  @ApiProperty({
    description: 'Sort tags by own order',
    required: false,
    example: false,
  })
  sortByOrder: boolean;

  @ApiProperty({
    description: 'Get tags starting from',
    required: false,
    example: 2,
  })
  offset: number;

  @ApiProperty({
    description: 'Get tags until',
    required: false,
    example: 5,
  })
  length: number;
}
