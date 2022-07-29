import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Length, Matches } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  id: string;

  @IsString()
  @ApiProperty({
    description: 'The name or nickname of the User',
    example: 'iGwT',
  })
  nickname: string;

  @IsEmail()
  @ApiProperty({
    description: 'The email address of the User',
    example: '15457akdepe@gmail.com',
  })
  email: string;

  @Length(8, 30)
  @Matches(/(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])/, {
    message: 'Password is too weak',
  })
  @ApiProperty({
    description: 'The password of the User',
    example: 'Digital2022',
  })
  password: string;
}
