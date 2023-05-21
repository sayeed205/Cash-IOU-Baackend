import {
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { LoginDto, SignupDto } from './dto'
import { User } from './schemas/user.schema'

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        private jwtService: JwtService,
    ) {}

    async signUp(
        signupInfo: SignupDto,
    ): Promise<{ ok: boolean; data: { token: string } }> {
        const { phone, password, name } = signupInfo

        // Check if user with phone number already exists as registered user
        const user = await this.userModel.findOne({ phone })
        if (user && user.isReal) {
            throw new ConflictException('phone number already in use')
        }
        if (user && !user.isReal) {
            // TODO: Send OTP to user and verify it to complete registration
            // sendOTP();
            user.name = name
            user.password = password
            user.isReal = true
            user.signedUpOn = new Date()
            await user.save()
            const token = this.jwtService.sign({ user_id: user._id })
            return { ok: true, data: { token } }
        }

        // if user not found, create new user
        const newUser = await this.userModel.create({
            name,
            password,
            phone,
            isReal: true,
            signedUpOn: new Date(),
        })

        const token = this.jwtService.sign({ user_id: newUser._id })
        return {
            ok: true,
            data: { token },
        }
    }

    async logIn(loginInfo: LoginDto) {
        const { phone, password } = loginInfo

        // Check if user with phone number already exists as registered user
        const user = await this.userModel.findOne({ phone, isReal: true })
        if (!user) throw new UnauthorizedException('Invalid credentials')

        // Check if password is correct
        const isPasswordCorrect = await user.comparePassword(password)
        if (!isPasswordCorrect)
            throw new UnauthorizedException('Invalid credentials')

        // Send jwt token back to user
        const token = this.jwtService.sign({ user_id: user._id })
        return {
            ok: true,
            data: { token },
        }
    }
}
