export type JwtRefreshPayloadType = {
  userId: string;
  username: string;
  iat?: number; // Issued at
  exp?: number; // Expiration time
};
