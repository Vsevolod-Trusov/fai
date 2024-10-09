import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserFirebaseService } from '../user';

import { app } from 'firebase-admin';

@Injectable()
export class AuthService {
  constructor(
    private readonly userFirebaseService: UserFirebaseService,
    @Inject('FIREBASE_APP') private readonly firebaseApp: app.App,
  ) {}

  async signUpWithEmail(
    email: string,
    password: string,
    role: string = 'user',
  ): Promise<{ uid: string }> {
    try {
      const { uid } = await this.userFirebaseService.create({
        email,
        password,
      });

      await this.userFirebaseService.setRole(uid, role);

      return { uid };
    } catch (error) {
      console.log(error.message);
      throw new UnauthorizedException(error.message);
    }
  }
}
