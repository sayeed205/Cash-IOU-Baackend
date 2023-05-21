import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { createTransactionDto, updateTransactionDto } from './dto';
import { TransactionQueryDto } from './dto/transaction-query.dto';
import { Transaction } from './schemas/transaction.schema';

@Injectable()
export class TransactionService {
    constructor(
        @InjectModel(Transaction.name)
        private readonly transactionModel: Model<Transaction>,
    ) {}

    async findAll(query: TransactionQueryDto): Promise<Transaction[]> {
        // TODO)) add pagination after defining the user schema only give transactions of a room
        return await this.transactionModel.find({ roomId: query.roomId });
    }

    async createTransaction(transactionInfo: {
        id: Types.ObjectId;
        transaction: createTransactionDto;
    }) {
        const { id, transaction } = transactionInfo;
        const newTransaction = await this.transactionModel.create({
            ...transaction,
            addedBy: id,
        });
        return newTransaction;
    }

    async getTransaction(id: Types.ObjectId): Promise<Transaction> {
        const transaction = await this.transactionModel.findById(id);
        if (!transaction)
            throw new NotFoundException("Transaction doesn't exist!");
        return transaction;
    }

    async updateTransaction(
        id: Types.ObjectId,
        transaction: updateTransactionDto,
    ): Promise<Transaction> {
        const updatedTransaction =
            await this.transactionModel.findByIdAndUpdate(id, transaction, {
                new: true,
            });

        if (!updatedTransaction)
            throw new NotFoundException("Transaction doesn't exist!");
        return updatedTransaction;
    }

    async deleteTransaction(id: Types.ObjectId): Promise<Transaction> {
        const deletedTransaction =
            await this.transactionModel.findByIdAndDelete(id);

        if (!deletedTransaction)
            throw new NotFoundException("Transaction doesn't exist!");
        return deletedTransaction;
    }
}
