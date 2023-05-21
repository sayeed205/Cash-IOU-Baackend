import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsJWT, IsObject } from 'class-validator';

class Token {
    @IsJWT()
    @ApiProperty({
        description: 'JWT token',
    })
    token: string;
}

export class AuthResponseDto {
    @IsBoolean()
    @ApiProperty({
        description: 'Boolean value to indicate if the request was successful',
    })
    ok: boolean;

    @IsObject()
    @ApiProperty({
        description: 'JWT token',
        type: Token,
    })
    data: Token;
}
