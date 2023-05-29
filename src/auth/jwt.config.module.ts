import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

/**
 * A module that provides configuration for the JWT module.
 */
@Module({
    imports: [
        ConfigModule,
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) =>
                getJwtOptions(configService),
            inject: [ConfigService],
        }),
    ],
    exports: [JwtModule],
})
export class JwtConfigModule {}

/**
 * A function that returns the options for the JWT module.
 * @param configService The configuration service to use.
 * @returns The options for the JWT module.
 */
function getJwtOptions(configService: ConfigService) {
    return {
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
            expiresIn: configService.get<string | number>('JWT_EXPIRES_IN'),
        },
    };
}
