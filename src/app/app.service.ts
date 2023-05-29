import { Injectable } from '@nestjs/common';
import { UserDocument } from 'src/auth/schemas';

@Injectable()
export class AppService {
    getHello() {
        return {
            message: 'Hello World!',
        };
    }

    whoAmI(user: UserDocument) {
        return {
            name: user.name,
            _id: user._id,
            phone: user.phone,
            phoneVerified: user.phoneVerified,
        };
    }
}
