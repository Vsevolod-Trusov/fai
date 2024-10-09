import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { app } from 'firebase-admin';
import { ROLES_KEY } from 'lib/constants';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    @Inject('FIREBASE_APP') private readonly firebaseApp: app.App,
    private readonly reflector: Reflector,
  ) {}

  matchRoles(roles: string[], userRole: any) {
    return roles.some((role) => role.toLowerCase() === userRole?.toLowerCase());
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndMerge(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return this.matchRoles(roles, user?.role);
  }
}
