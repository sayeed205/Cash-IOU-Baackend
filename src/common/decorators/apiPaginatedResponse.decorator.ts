import { Type, applyDecorators } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

import { PaginationDto } from '../dto';

export const ApiPaginatedResponse = <TModel extends Type<any>>(model: TModel) =>
    applyDecorators(
        ApiOkResponse({
            schema: {
                title: `${model.name}PaginatedResponse`,
                allOf: [
                    { $ref: getSchemaPath(PaginationDto) },
                    {
                        properties: {
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
