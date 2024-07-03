import { User } from '../../users/domain/user';
export type LoginResponseType = Readonly<{
  user: User;
  tokens: {
    token: string;
    tokenExpires: number;
    refreshToken: string;
  };
}>;

export type refreshTokenResponseType = Readonly<{
  tokens: { token: string; refreshToken: string; tokenExpires: number };
}>;
