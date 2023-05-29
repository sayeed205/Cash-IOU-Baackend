// providers.ts
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

export const authProviders = [AuthService, JwtStrategy];
