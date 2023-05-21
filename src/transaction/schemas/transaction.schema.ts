import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Schema as MongooseSchema, ObjectId } from 'mongoose';
import { Types } from 'mongoose';
import { User } from '../../auth/schemas';
import { TransactionRoom } from '../../transaction-room/schemas';

export enum TransactionType {
    Credit = 'credit',
    Debit = 'debit',
}

@Schema({ timestamps: true })
export class Transaction {
    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: TransactionRoom.name,
    })
    roomId: Types.ObjectId;

    @Prop({ required: true })
    type: TransactionType;

    @Prop({ required: true })
    amount: number;

    @Prop()
    note: string;

    @Prop()
    date: Date;
    @Prop({ ref: User.name, type: Types.ObjectId })
    addedBy: Types.ObjectId;

    @Prop({ default: false })
    isDeleted: boolean;

    @Prop({ ref: User.name, type: Types.ObjectId })
    deletedBy: Types.ObjectId;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
