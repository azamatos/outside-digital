import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TagEntity } from './tags.entity';
import { UserTagEntity } from './usertags.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 100 })
  email!: string;

  @Column({ unique: true, length: 100 })
  nickname!: string;

  @Column({ length: 100 })
  password!: string;

  @OneToMany(() => TagEntity, (tag) => tag.creatorId, { onDelete: 'CASCADE' })
  tags: TagEntity[];

  @OneToMany(() => UserTagEntity, (userTag) => userTag.userid, {
    onDelete: 'CASCADE',
  })
  ownTags: UserTagEntity[];
}
