import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { app } from 'firebase-admin';
import { STRATEGIES } from 'lib/constants';
import { ExtractJwt, Strategy } from 'passport-firebase-jwt';

import { Request } from 'express';

@Injectable()
export class AccessStrategy extends PassportStrategy(
  Strategy,
  STRATEGIES.ACCESS,
) {
  constructor(@Inject('FIREBASE_APP') private readonly firebaseApp: app.App) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        AccessStrategy.extractAccessToken,
      ]),
      ignoreExpiration: false,
    });
  }

  static extractAccessToken(request: Request) {
    const cookies = request?.cookies;
    const tokenId = cookies.tokenId;
    return tokenId;
  }

  async validate(tokenId: string) {
    const firebaseUser: { uid: string } = await this.firebaseApp
      .auth()
      .verifyIdToken(tokenId)
      .catch((err) => {
        console.log(err);
        throw new UnauthorizedException(err.message);
      });
    if (!firebaseUser) {
      throw new UnauthorizedException();
    }
    return firebaseUser;
  }
}
