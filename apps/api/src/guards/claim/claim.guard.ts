import { JwtPayload } from '@auth/types';
import { CLAIM_KEY } from '@decorators/claim/claim.decorator';
import { roles } from '@guards/claim/roles';
import { ClaimKeys } from '@guards/claim/types';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as _ from 'lodash';

@Injectable()
export class ClaimGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredClaims = this.reflector.getAllAndOverride<ClaimKeys[]>(
      CLAIM_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredClaims) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest<{ user: JwtPayload }>();

    if (!user) return false;

    const roleClaim = roles[user.role];

    if (!roleClaim) return false;

    return requiredClaims.every((role) => {
      const claimAll = role.replace(/\w*$/, 'all');
      return _.get(roleClaim, role) || _.get(roleClaim, claimAll);
    });
  }
}
