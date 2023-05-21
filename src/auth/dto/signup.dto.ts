import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsPhoneNumber,
    IsString,
    IsStrongPassword,
} from 'class-validator';

export class SignupDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Name of the user',
    })
    name: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    @ApiProperty({
        description: 'Phone number with country code',
        example: '+919988556677',
    })
    phone: string;

    @IsNotEmpty()
    @IsStrongPassword()
    @ApiProperty({
        description:
            'A password with minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character',
        example: 'Abcd@1234',
    })
    password: string;
}
