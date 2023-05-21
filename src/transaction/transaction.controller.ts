import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';
import { Types } from 'mongoose';

import { User } from '../auth/schemas/user.schema';
import { GetUser } from '../common/decorators';
import { ValidateMongoId } from '../pipes';
import {
    TransactionQueryDto,
    createTransactionDto,
    updateTransactionDto,
} from './dto';
import { TransactionService } from './transaction.service';

@Controller('transactions')
@ApiTags('Transactions')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Get()
    @ApiOkResponse({ description: 'Transactions fetched successfully' })
    async getAllTransaction(
        @Query()
        query: TransactionQueryDto,
    ) {
        return await this.transactionService.findAll(query); // TODO)) add pagination after defining the user schema
    }

    @Post()
    @ApiCreatedResponse({ description: 'Transaction created successfully' })
    async createTransaction(
        @Body()
        transaction: createTransactionDto,
        @GetUser()
        user: User,
    ) {
        return await this.transactionService.createTransaction({
            transaction,
            id: user.id,
        });
    }

    @Get(':id')
    @ApiOkResponse({ description: 'Transaction fetched successfully' })
    // @ApiNor
    async getTransaction(
        @Param('id', ValidateMongoId)
        id: Types.ObjectId,
    ) {
        return await this.transactionService.getTransaction(id);
    }

    @Patch(':id')
    async updateTransaction(
        @Param('id', ValidateMongoId)
        id: Types.ObjectId,
        @Body()
        transaction: updateTransactionDto,
    ) {
        return await this.transactionService.updateTransaction(id, transaction);
    }

    @Delete(':id')
    async deleteTransaction(
        @Param('id', ValidateMongoId)
        id: Types.ObjectId,
    ) {
        return await this.transactionService.deleteTransaction(id);
    }
}
