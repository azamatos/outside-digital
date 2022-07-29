import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInterface } from '../interfaces/users.interface';
import { JwtInterface } from '../interfaces/token.interface';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async register(user: CreateUserDto): Promise<string> {
    try {
      user.password = await bcrypt.hash(user.password, 12);

      await this.usersRepository.save(user);

      const jwt = await this.jwtService.signAsync({ id: user.id });
      return jwt;
    } catch {
      throw new BadRequestException('Something went wrong...');
    }
  }

  async login(userEmail: string, pass: string) {
    const user: UserInterface = await this.usersRepository.findOne({
      where: { email: userEmail },
    });

    if (user === null) {
      throw new BadRequestException('Invalid credentials');
    }

    try {
      const result = await bcrypt.compare(pass, user.password);
      if (result) {
        const jwt = await this.jwtService.signAsync({ id: user.id });
        return jwt;
      } else throw new BadRequestException('Invalid credentials');
    } catch {
      throw new BadRequestException('Invalid credentials');
    }
  }

  async logout(jwt: string) {
    const token: [{ id: string }] = await this.usersRepository.query(
      `SELECT id FROM token WHERE token='${jwt}'`,
    );
    if (token[0] === undefined) {
      const bearer = jwt.substr(7, jwt.length - 7);
      try {
        const verification: JwtInterface = await this.jwtService.verifyAsync(
          bearer,
        );
        if (verification.id) {
          await this.usersRepository.query(
            `INSERT INTO token(token) VALUES('${jwt}')`,
          );
        } else throw new BadRequestException('Invalid token');
      } catch {
        throw new BadRequestException('Invalid token');
      }
      return true;
    } else throw new BadRequestException('Already logged out');
  }

  async getUser(jwt: string) {
    const bearer = jwt.substr(7, jwt.length - 7);
    try {
      const token: JwtInterface = await this.jwtService.verifyAsync(bearer);

      const user: UserInterface = await this.usersRepository.findOne({
        where: { id: token.id },
        relations: ['tags'],
      });
      delete user.id;
      delete user.password;
      return user;
    } catch {
      throw new BadRequestException('Invalid token');
    }
  }

  async putUser(jwt: string, user: UpdateUserDto) {
    const bearer = jwt.substr(7, jwt.length - 7);
    user.password = await bcrypt.hash(user.password, 12);
    try {
      const token: JwtInterface = await this.jwtService.verifyAsync(bearer);
      await this.usersRepository.update(token.id, user);
    } catch {
      throw new BadRequestException('Invalid PUT data');
    }
    delete user.id;
    delete user.password;
    return user;
  }

  async deleteUser(jwt: string) {
    const bearer = jwt.substr(7, jwt.length - 7);
    try {
      const token: JwtInterface = await this.jwtService.verifyAsync(bearer);

      await this.usersRepository.delete(token.id);
    } catch {
      throw new BadRequestException('Invalid token');
    }
    return true;
  }
}
