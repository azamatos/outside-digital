import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TagEntity } from './tags.entity';
import { UserEntity } from './users.entity';

@Entity('user_tags')
export class UserTagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: string;
  @ManyToOne(() => UserEntity, (user) => user.ownTags, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  userid!: UserEntity;

  @Column()
  tag_id: number;
  @ManyToOne(() => TagEntity, (tag) => tag.userTags, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tag_id' })
  tagId!: TagEntity;
}
