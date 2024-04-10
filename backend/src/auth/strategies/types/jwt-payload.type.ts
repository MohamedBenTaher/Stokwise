import { User } from '../../../users/domain/user';

export type JwtPayloadType = Pick<User, 'id' | 'role'> & {
  userId: string;
  username: string;
  iat: number;
  exp: number;
};
