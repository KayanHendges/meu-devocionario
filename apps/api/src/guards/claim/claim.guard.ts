import { JwtPayload } from '@auth/types';
import { CLAIM_KEY } from '@decorators/claim/claim.decorator';
import { ClaimKeys, validateRoleClaim } from 'project-common';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

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

    console.log(user.role, requiredClaims);

    return validateRoleClaim(user.role, requiredClaims);
  }
}
