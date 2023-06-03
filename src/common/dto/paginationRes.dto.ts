import { ApiProperty } from '@nestjs/swagger';

export class PaginationResDto<TData> {
    @ApiProperty({
        description: 'Total number of items found in the collection',
    })
    total: number;

    @ApiProperty({
        description: 'Number of items per page',
    })
    limit: number;

    @ApiProperty({
        description: 'Number of pages',
    })
    pages: number;

    @ApiProperty({
        description: 'Current page',
    })
    page: number;

    @ApiProperty({
        description: 'Resulting data',
    })
    results: TData[];
}
