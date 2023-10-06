import { ClaimKeys } from '@guards/claim/types';
import { SetMetadata } from '@nestjs/common';

export const CLAIM_KEY = 'claim';
export const Claim = (...claims: ClaimKeys[]) => SetMetadata(CLAIM_KEY, claims);
