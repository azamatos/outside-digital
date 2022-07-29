import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrder, Repository } from 'typeorm';
import { JwtInterface } from '../interfaces/token.interface';
import { JwtService } from '@nestjs/jwt';
import { TagEntity } from '../entities/tags.entity';
import { TagInterface } from '../interfaces/tag.interface';
import { PaginationParams } from '../interfaces/pagination.interface';
import { CreateTagDto } from '../dto/create-tag.dto';
import { UpdateTagDto } from '../dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
    private jwtService: JwtService,
  ) {}

  async createTag(jwt: string, tag: CreateTagDto) {
    const bearer = jwt.substr(7, jwt.length - 7);
    try {
      const token: JwtInterface = await this.jwtService.verifyAsync(bearer);
      tag.creator = token.id;
    } catch {
      throw new BadRequestException('Invalid token');
    }
    try {
      const tagData = await this.tagRepository.save(tag);
      delete tagData.creator;
      return tagData;
    } catch {
      throw new BadRequestException('Invalid TAG data');
    }
  }

  async getTag(jwt: string, tagId: number) {
    const bearer = jwt.substr(7, jwt.length - 7);
    try {
      await this.jwtService.verifyAsync(bearer);
    } catch {
      throw new BadRequestException('Invalid token');
    }
    try {
      const tag: TagInterface = await this.tagRepository.findOne({
        where: { id: tagId },
        relations: ['creatorId'],
      });
      const resultTag = {
        creator: {
          nickname: tag.creatorId.nickname,
          uid: tag.creatorId.id,
        },
        name: tag.name,
        sortOrder: tag.sortOrder,
      };
      return resultTag;
    } catch {
      throw new BadRequestException('Invalid data');
    }
  }

  async getAllTags(jwt: string, pagination: PaginationParams) {
    const bearer = jwt.substr(7, jwt.length - 7);
    try {
      await this.jwtService.verifyAsync(bearer);
    } catch {
      throw new BadRequestException('Invalid token');
    }
    const byOrder: FindOptionsOrder<TagEntity> = { sortOrder: 'ASC' };
    const byName: FindOptionsOrder<TagEntity> = { name: 'ASC' };
    const [items, count] = await this.tagRepository.findAndCount({
      relations: ['creatorId'],
      order:
        (pagination.sortByName === 'true' && byName) ||
        (pagination.sortByOrder === 'true' && byOrder),
      skip: pagination.offset,
      take: pagination.length,
    });

    items.forEach((item) => {
      delete item.id;
      delete item.creator;
      delete item.creatorId.password;
      delete item.creatorId.email;
    });
    return {
      data: items,
      meta: {
        offset: pagination.offset,
        length: pagination.length,
        quantity: count,
      },
    };
  }

  async putUser(jwt: string, newTag: UpdateTagDto, tagId: number) {
    const bearer = jwt.substr(7, jwt.length - 7);
    try {
      await this.jwtService.verifyAsync(bearer);
    } catch {
      throw new BadRequestException('Invalid token');
    }
    try {
      await this.tagRepository.update(tagId, newTag);
      const tag: TagInterface = await this.tagRepository.findOne({
        where: { id: tagId },
        relations: ['creatorId'],
      });
      const resultTag = {
        creator: {
          nickname: tag.creatorId.nickname,
          uid: tag.creatorId.id,
        },
        name: tag.name,
        sortOrder: tag.sortOrder,
      };
      return resultTag;
    } catch {
      throw new BadRequestException('Invalid data');
    }
  }

  async deleteTag(jwt: string, tagId: number) {
    const bearer = jwt.substr(7, jwt.length - 7);
    try {
      const user: JwtInterface = await this.jwtService.verifyAsync(bearer);
      const { creator } = await this.tagRepository.findOne({
        select: {
          creator: true,
        },
        where: { id: tagId },
      });

      if (creator === user.id) {
        await this.tagRepository.delete(tagId);
      }
    } catch {
      throw new BadRequestException('Invalid token or data');
    }

    return true;
  }

  async getOwnTags(jwt: string) {
    const bearer = jwt.substr(7, jwt.length - 7);
    try {
      const { id: userId }: JwtInterface = await this.jwtService.verifyAsync(
        bearer,
      );

      const result: TagEntity[] = await this.tagRepository.find({
        where: { creator: userId },
        order: { id: 'ASC' },
      });

      return result.map((item) => {
        delete item.creator;
        return item;
      });
    } catch {
      throw new BadRequestException('Invalid token or data');
    }
  }
}
