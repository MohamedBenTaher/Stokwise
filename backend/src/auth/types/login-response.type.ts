import { User } from '../../users/domain/user';
export type LoginResponseType = Readonly<{
  user: User;
}>;
