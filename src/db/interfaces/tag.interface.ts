import { UserEntity } from '../entities/users.entity';

export interface TagInterface {
  id: number;
  name: string;
  creator: string;
  sortOrder?: number;
  creatorId: UserEntity;
}
