import { Test, TestingModule } from '@nestjs/testing';
import { TransactionRoomService } from './transaction-room.service';

describe('TransactionRoomService', () => {
    let service: TransactionRoomService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TransactionRoomService],
        }).compile();

        service = module.get<TransactionRoomService>(TransactionRoomService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
