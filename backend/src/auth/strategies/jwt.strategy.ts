import { Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { JwtPayloadType } from './types/jwt-payload.type';
import { AllConfigType } from '../../config/config.type';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService<AllConfigType>) {
    super({
      jwtFromRequest: JwtStrategy.extractJWT,
      secretOrKey: configService.get('auth.secret', { infer: true }),
    });
  }

  private static extractJWT(req: Request): string {
    if (req.cookies && 'access_token' in req.cookies) {
      return req.cookies.access_token;
    }
    throw new UnauthorizedException();
  }
  validate(payload: JwtPayloadType) {
    if (!payload) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
