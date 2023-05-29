import { ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

export const GlobalPipes = [
    {
        provide: APP_PIPE,
        useFactory() {
            return new ValidationPipe({
                whitelist: true,
            });
        },
    },
    {
        provide: APP_PIPE,
        useFactory() {
            return new ValidationPipe({
                transform: true,
                transformOptions: {
                    enableImplicitConversion: true,
                    groups: ['transform'],
                },
            });
        },
    },
];
