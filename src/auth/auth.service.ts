import {
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AuthError, LoginInfo, SignupInfo } from './interfaces/auth.interface';
import { User } from './schemas/user.schema';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        private jwtService: JwtService,
    ) {}

    async signUp(signupInfo: SignupInfo): Promise<{ token: string }> {
        const { phone, password, name } = signupInfo;

        // Check if user with phone number already exists as registered user
        let user = await this.userModel.findOne({ phone });
        if (user && user.isReal) {
            throw new ConflictException(AuthError.PhoneAlreadyInUse);
        }
        if (user && !user.isReal) {
            // TODO: Send OTP to user and verify it to complete registration
            // sendOTP();
            user.name = name;
            user.password = password;
            user.isReal = true;
            user.signedUpOn = new Date();
            await user.save();
            const token = this.jwtService.sign({ user_id: user._id });
            return { token };
        }

        // if user not found, create new user
        const newUser = await this.userModel.create({
            name,
            password,
            phone,
            isReal: true,
            signedUpOn: new Date(),
        });

        const token = this.jwtService.sign({ user_id: newUser._id });
        return { token };
    }

    async logIn(loginInfo: LoginInfo) {
        const { phone, password } = loginInfo;

        // Check if user with phone number already exists as registered user
        const user = await this.userModel.findOne({ phone, isReal: true });
        if (!user)
            throw new UnauthorizedException(AuthError.InvalidCredentials);

        // Check if password is correct
        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect)
            throw new UnauthorizedException(AuthError.InvalidCredentials);

        // Send jwt token back to user
        const token = this.jwtService.sign({ user_id: user._id });
        return {
            token,
            name: user.name,
            phone: user.phone,
            image: user.avatar,
            id: user._id,
        };
    }
}
