import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';

export class PaginationQueryDto {
    @ApiProperty({
        description: 'Number of items per page',
        default: 10,
        minimum: 1,
        maximum: 50,
    })
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    @Min(1)
    @Max(50)
    limit = 10;

    @ApiProperty({
        description: 'Current page',
        default: 1,
        minimum: 1,
    })
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    @Min(1)
    page = 1;
}
