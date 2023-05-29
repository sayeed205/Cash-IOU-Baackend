import { MorganMiddleware } from '@nest-middlewares/morgan';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { TransactionRoomModule } from '../transaction-room/transaction-room.module';
import { TransactionModule } from '../transaction/transaction.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalPipes } from './providers';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
        MongooseModule.forRoot(process.env.DATABASE_URL),
        TransactionRoomModule,
        TransactionModule,
        AuthModule,
        MongooseModule.forFeature([{ name: 'User', schema: 'UserSchema' }]),
    ],
    controllers: [AppController],
    providers: [AppService, ...GlobalPipes],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        MorganMiddleware.configure('dev');
        consumer.apply(MorganMiddleware).forRoutes('*');
    }
}
