import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class CreateUserDto {
  id: string;

  @ApiProperty({
    description: 'The name or nickname of the User',
    example: 'iGwT',
  })
  @IsString()
  nickname: string;

  @ApiProperty({
    description: 'The email address of the User',
    example: '15457akdepe@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the User',
    example: 'Digital2022',
  })
  @Length(8, 30)
  @Matches(/(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])/, {
    message: 'Password is too weak',
  })
  password: string;
}
