import { UserRole } from 'database';

interface JwtPayload {
  id: string;
  role: UserRole;
}
