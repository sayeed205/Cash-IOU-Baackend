// auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { JwtConfigModule } from './jwt.config.module';
import { JwtStrategy } from './jwt.strategy';
import { authProviders } from './providers';
import { UserModule } from './user.module';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtConfigModule,
        UserModule,
    ],
    controllers: [AuthController],
    providers: [...authProviders],
    exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
