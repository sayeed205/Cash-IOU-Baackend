import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
class roomDetails {
    @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
    userId: Types.ObjectId;

    @Prop()
    name: string;

    @Prop()
    avatar?: string;

    @Prop({ type: Types.ObjectId, ref: 'Transaction' })
    lastTransaction?: Types.ObjectId;
}

@Schema({ timestamps: true })
export class TransactionRoom {
    @Prop({
        required: true,
        type: [Types.ObjectId],
        validate: {
            validator: (val: string | Types.ObjectId[]) => val.length === 2,
        },
    })
    members: Types.ObjectId[];

    @Prop({
        validate: {
            validator: (val: string | Types.ObjectId[]) => val.length <= 2,
        },
    })
    roomDetails: roomDetails[];
}

export const TransactionRoomSchema =
    SchemaFactory.createForClass(TransactionRoom);
