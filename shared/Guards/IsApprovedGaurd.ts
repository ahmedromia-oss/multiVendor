import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserToken } from 'shared/models/userToken.model';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class IsApprovedGaurd implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Switch to GraphQL context
    const ctx = GqlExecutionContext.create(context);
    const gqlContext = ctx.getContext();
    const user: UserToken = gqlContext.user;

    if (user?.Approved) {
      return true;
    }
    throw new ForbiddenException({ code: 'Un Approved' });
  }
}
