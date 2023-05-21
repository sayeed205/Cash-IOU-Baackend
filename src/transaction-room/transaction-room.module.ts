import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { User, UserSchema } from '../auth/schemas/user.schema';

import { TransactionRoom, TransactionRoomSchema } from './schemas';
import { TransactionRoomController } from './transaction-room.controller';
import { TransactionRoomService } from './transaction-room.service';

@Module({
    imports: [
        AuthModule,
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: TransactionRoom.name, schema: TransactionRoomSchema },
        ]),
    ],
    controllers: [TransactionRoomController],
    providers: [TransactionRoomService],
})
export class TransactionRoomModule {}
