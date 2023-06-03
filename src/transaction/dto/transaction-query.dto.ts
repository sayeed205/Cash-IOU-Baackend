import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

import { Types } from 'mongoose';
import { IsValidMongoId } from 'src/utilities/decorators';

export class TransactionQueryDto {
    @IsNotEmpty()
    @Transform(({ value }) => new Types.ObjectId(value), {
        groups: ['transform'],
    })
    @ApiProperty({
        description: 'MongoId of the transaction room',
        example: '5f9d2f8b9d6b1e1f3c9b1b1b',
        required: true,
    })
    @IsValidMongoId()
    roomId: string;

    @Transform(({ value }) => parseInt(value))
    @IsInt()
    @ApiProperty({
        description: 'Page number',
        example: 1,
        default: 1,
        required: false,
    })
    page = 1;

    @Transform(({ value }) => parseInt(value))
    @IsInt()
    @ApiProperty({
        description: 'Limit of the transactions per page',
        example: 10,
        default: 10,
        required: false,
    })
    limit = 10;

    @IsString()
    @ApiProperty({
        description: 'Search query',
        example: 'dinner',
        required: false,
    })
    q = '';
}
