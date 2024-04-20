import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { authConstants } from './auth.constants';

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 1. ignoreExpiration: false, // 2.
      secretOrKey: authConstants.secret,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email }; // 5. }
  }
}
