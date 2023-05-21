import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class createTransactionRoomDto {
    @IsNotEmpty()
    @ApiProperty({
        description:
            'Name of the transaction room more like whom you lend money or from whom you borrow money',
        example: 'John Doe',
    })
    readonly name: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    @ApiProperty({
        description: 'Phone number with country code',
        example: '+919988556677',
    })
    readonly phone: string;
}
