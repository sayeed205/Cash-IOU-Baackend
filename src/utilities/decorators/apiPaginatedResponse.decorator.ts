import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

import { PaginationResDto } from '../../common/dto';

export const ApiPaginatedResponse = <TModel extends Type<any>>(model: TModel) =>
    applyDecorators(
        ApiOkResponse({
            schema: {
                title: `${model.name}PaginatedResponse`,
                allOf: [
                    { $ref: getSchemaPath(PaginationResDto) },
                    {
                        properties: {
                            page: {
                                type: 'number',
                                default: 1,
                            },
                            limit: {
                                type: 'number',
                                default: 10,
                            },
                            total: {
                                type: 'number',
                            },
                            pages: {
                                type: 'number',
                            },
                            results: {
                                type: 'array',
                                items: { $ref: getSchemaPath(model) },
                            },
                        },
                    },
                ],
            },
        }),
    );
