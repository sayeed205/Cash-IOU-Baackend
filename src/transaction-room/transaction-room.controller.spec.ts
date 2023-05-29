import { Test, TestingModule } from '@nestjs/testing';
import { TransactionRoomController } from './transaction-room.controller';

describe('TransactionRoomController', () => {
    let controller: TransactionRoomController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TransactionRoomController],
        }).compile();

        controller = module.get<TransactionRoomController>(
            TransactionRoomController,
        );
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
