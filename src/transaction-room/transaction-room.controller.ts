import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Types } from 'mongoose';
import { PaginationQueryDto } from 'src/common/dto/paginationQuery.dto';

import { User } from '../auth/schemas/user.schema';
import { ApiPaginatedResponse, GetUser } from '../utilities/decorators';
import { ValidateMongoId } from '../utilities/pipes';
import { createTransactionRoomDto } from './dto';
import { TransactionRoomRes } from './dto/transaction-rooms-res.dto';
import { TransactionRoomService } from './transaction-room.service';

@Controller('transaction-room')
@ApiTags('Transaction Room')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class TransactionRoomController {
    constructor(
        private readonly transactionRoomService: TransactionRoomService,
    ) {}

    @Post()
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiCreatedResponse({ description: 'Transaction Room Created' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async createTransactionRoom(
        @Body()
        transactionRoom: createTransactionRoomDto,
        @GetUser()
        user: User,
    ) {
        return await this.transactionRoomService.createTransactionRoom({
            id: user._id,
            name: transactionRoom.name,
            phone: transactionRoom.phone,
        });
    }

    @Get('all')
    @ApiPaginatedResponse(TransactionRoomRes)
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    async getAllTransactionRooms(
        @GetUser()
        user: User,
        @Query()
        paginationQuery: PaginationQueryDto,
    ) {
        console.log('paginationQuery', paginationQuery);
        const _id = user._id;
        return await this.transactionRoomService.getAllTransactionRooms(_id, {
            ...paginationQuery,
        });
    }

    @Get(':id')
    async getTransactionRoom(
        @Param('id', ValidateMongoId)
        id: Types.ObjectId,
    ) {}
}
