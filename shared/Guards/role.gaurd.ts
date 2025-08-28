import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserType } from 'shared/constants';
import { ROLES_KEY } from 'shared/Decorators/Role.decorator';
import { UserToken } from 'shared/models/userToken.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    const ctx = GqlExecutionContext.create(context);

    const user: UserToken = ctx.getContext().req.user;
    if (requiredRoles.includes(user.type)) {
      return true;
    } else {
      throw new ForbiddenException();
    }
  }
}
