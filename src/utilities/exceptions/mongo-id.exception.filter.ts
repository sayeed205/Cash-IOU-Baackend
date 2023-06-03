import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ExceptionFilter,
} from '@nestjs/common';
import { Request, Response } from 'express';

export class MongoIdException extends BadRequestException {
    constructor(public readonly value: string) {
        const message = value
            ? `'${value}' is not a valid MongoId`
            : 'Please provide a MongoId';
        super(message);
    }
}

@Catch(MongoIdException)
export class MongoIdExceptionFilter implements ExceptionFilter {
    catch(exception: MongoIdException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        console.log(exception);
        response.status(400).json({
            statusCode: 400,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: 'Invalid MongoId',
        });
    }
}
