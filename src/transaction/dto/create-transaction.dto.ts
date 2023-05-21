import { ApiProperty } from '@nestjs/swagger';
import {
    IsDateString,
    IsEnum,
    IsMongoId,
    IsNotEmpty,
    IsNumber,
} from 'class-validator';
import { Types } from 'mongoose';
import { TransactionType } from '../schemas';

export class createTransactionDto {
    @IsNotEmpty()
    @IsMongoId()
    @ApiProperty({
        description: 'MongoId of the transaction room',
        example: '5f9d2f8b9d6b1e1f3c9b1b1b',
    })
    readonly roomId: Types.ObjectId;

    @IsEnum(TransactionType)
    @ApiProperty({
        description: 'Type of the transaction',
        enum: TransactionType,
        example: TransactionType.Credit,
    })
    readonly type: TransactionType;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        description: 'Amount of the transaction',
        example: 100,
    })
    readonly amount: number;

    @ApiProperty({
        description: 'Note of the transaction',
        example: 'Paid for dinner',
        required: false,
    })
    readonly note?: string;

    @IsNotEmpty()
    @IsDateString()
    @ApiProperty({
        description: 'Date of the transaction',
        example: '2020-10-30T18:30:00.000Z',
    })
    readonly date: Date;
}
