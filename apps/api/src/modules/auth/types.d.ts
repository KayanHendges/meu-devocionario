import { UserRole } from 'database';

interface JwtPayload {
  id: string;
  role: UserRole;
}

interface LoginResponse {
  accessToken: string;
}
