import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { JwtPayload as JwtPayloadBase } from 'jsonwebtoken';

interface JwtPayload extends JwtPayloadBase {
  user: string;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const secret = process.env.AUTH_JWT_SECRET;
    if (!secret) {
      throw new Error('Missing JWT secret');
    }

    const accessToken = req.cookies['access-token'];
    const refreshToken = req.cookies['refresh-token'];

    if (!accessToken || !refreshToken) {
      res.status(401).json({ error: 'Missing access token or refresh token' });
      return;
    }

    try {
      // Verify the access token
      const decoded = jwt.verify(accessToken, secret) as JwtPayload;
      req['user'] = decoded.user;
    } catch (err) {
      // If the access token is expired, try to refresh it
      if (err.name === 'TokenExpiredError') {
        try {
          const decodedRefreshToken = jwt.verify(
            refreshToken,
            secret,
          ) as JwtPayload;

          // Ensure the refresh token and access token are for the same user
          if (decodedRefreshToken.user !== err.payload.user) {
            throw new Error('Invalid refresh token');
          }

          // Issue a new access token
          const newAccessToken = jwt.sign(
            { user: decodedRefreshToken.user },
            secret,
            { expiresIn: '15m' },
          );
          res.cookie('access-token', newAccessToken, { httpOnly: true });
          res.json({ accessToken: newAccessToken }); // Return the new access token
        } catch (err) {
          // If the refresh token is also invalid, clear the cookies
          res.clearCookie('access-token');
          res.clearCookie('refresh-token');
          res.status(401).json({ error: 'Invalid refresh token' }); // Return an error response
          return;
        }
      }
    }

    next();
  }
}
