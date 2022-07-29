import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtInterface } from '../interfaces/token.interface';
import { JwtService } from '@nestjs/jwt';
import { UserTagEntity } from '../entities/usertags.entity';

@Injectable()
export class UserTagService {
  constructor(
    @InjectRepository(UserTagEntity)
    private readonly userTagRepository: Repository<UserTagEntity>,
    private jwtService: JwtService,
  ) {}

  async createUserTag(jwt: string, tagIds: number[]) {
    const bearer = jwt.substr(7, jwt.length - 7);
    try {
      const { id: userId }: JwtInterface = await this.jwtService.verifyAsync(
        bearer,
      );
      const data = tagIds.map((item) => {
        return {
          user_id: userId,
          tag_id: item,
        };
      });
      await this.userTagRepository
        .createQueryBuilder()
        .insert()
        .into(UserTagEntity)
        .values(data)
        .execute();

      const userTags: UserTagEntity[] = await this.userTagRepository.find({
        where: { user_id: userId },
        relations: ['tagId'],
        order: { tag_id: 'ASC' },
      });
      const result = userTags.map((item) => {
        return {
          id: item.tagId.id,
          name: item.tagId.name,
          sortOrder: item.tagId.sortOrder,
        };
      });
      return result;
    } catch {
      throw new BadRequestException('Invalid token or Data');
    }
  }

  async deleteUserTag(jwt: string, id: number) {
    const bearer = jwt.substr(7, jwt.length - 7);

    // try {
    const { id: userId }: JwtInterface = await this.jwtService.verifyAsync(
      bearer,
    );
    await this.userTagRepository.query(
      `DELETE FROM user_tags WHERE tag_id='${id}' AND user_id='${userId}'`,
    );

    const userTags: UserTagEntity[] = await this.userTagRepository.find({
      where: { user_id: userId },
      relations: ['tagId'],
      order: { tag_id: 'ASC' },
    });
    const result = userTags.map((item) => {
      return {
        id: item.tagId.id,
        name: item.tagId.name,
        sortOrder: item.tagId.sortOrder,
      };
    });
    return result;
  }
}
