import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './users.entity';
import { UserTagEntity } from './usertags.entity';

@Entity('tags')
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  creator: string;
  @ManyToOne(() => UserEntity, (user) => user.tags, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'creator' })
  creatorId: UserEntity;

  @Column({ unique: true, length: 40 })
  name!: string;

  @Column({ default: 0 })
  sortOrder: number;

  @OneToMany(() => UserTagEntity, (userTag) => userTag.tagId, {
    onDelete: 'CASCADE',
  })
  userTags: UserTagEntity[];
}
