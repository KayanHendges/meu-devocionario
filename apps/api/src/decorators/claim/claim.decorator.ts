import { ClaimKeys } from 'project-common';
import { SetMetadata } from '@nestjs/common';

export const CLAIM_KEY = 'claim';
export const Claim = (...claims: ClaimKeys[]) => SetMetadata(CLAIM_KEY, claims);
