import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { JwtRefreshPayloadType } from './types/jwt-refresh-paylaod.type';
import { AllConfigType } from '../../config/config.type';
import { Request } from 'express';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(configService: ConfigService<AllConfigType>) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtRefreshStrategy.extractJWT,
      ]),
      secretOrKey: configService.get('auth.refreshSecret', { infer: true }),
      passReqToCallback: true,
      ignoreExpiration: false,
    });
  }

  private static extractJWT(req: Request): string | null {
    if (req.cookies && 'refresh_token' in req.cookies) {
      return req.cookies.refresh_token;
    }
    return null;
  }
  validate(req: Request, payload: JwtRefreshPayloadType) {
    const refreshToken = req.cookies.refresh_token;
    return { ...payload, refreshToken };
  }
}
