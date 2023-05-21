import { Body, Controller, Post } from '@nestjs/common';
import {
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthResponseDto, LoginDto, SignupDto } from './dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    @ApiCreatedResponse({
        description: 'User signed up successfully',
        type: AuthResponseDto,
    })
    @ApiConflictResponse({ description: 'User already exists' })
    async signup(
        @Body()
        signupInfo: SignupDto,
    ) {
        return this.authService.signUp(signupInfo);
    }

    @Post('login')
    @ApiOkResponse({
        description: 'User logged in successfully',
        type: AuthResponseDto,
    })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    async login(
        @Body()
        loginInfo: LoginDto,
    ) {
        return this.authService.logIn(loginInfo);
    }
}
