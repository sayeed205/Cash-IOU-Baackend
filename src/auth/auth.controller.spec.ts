import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthResponseDto, LoginDto, SignupDto } from './dto';

describe('AuthController', () => {
    let controller: AuthController;
    let authService: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [AuthService],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService);
    });

    describe('signup', () => {
        it('should return an AuthResponseDto with a token', async () => {
            const signupInfo: SignupDto = {
                name: 'John Doe',
                phone: '+919988556677',
                password: 'Abcd@1234',
            };
            const authResponse: AuthResponseDto = {
                data: {
                    token: 'jwt.token',
                },
                ok: true,
            };
            jest.spyOn(authService, 'signUp').mockResolvedValue(authResponse);

            const result = await controller.signup(signupInfo);

            expect(result).toEqual(authResponse);
        });

        it('should throw a conflict exception if user already exists', async () => {
            const signupInfo: SignupDto = {
                name: 'John Doe',
                phone: '+919988556677',
                password: 'Abcd@1234',
            };
            jest.spyOn(authService, 'signUp').mockRejectedValue(
                new ConflictException(),
            );

            await expect(controller.signup(signupInfo)).rejects.toThrow(
                ConflictException,
            );
        });
    });

    describe('login', () => {
        it('should return an AuthResponseDto with a token', async () => {
            const loginInfo: LoginDto = {
                phone: '+919988556677',
                password: 'Abcd@1234',
            };
            const authResponse: AuthResponseDto = {
                data: {
                    token: 'jwt.token',
                },
                ok: true,
            };
            jest.spyOn(authService, 'logIn').mockResolvedValue(authResponse);

            const result = await controller.login(loginInfo);

            expect(result).toEqual(authResponse);
        });

        it('should throw an unauthorized exception if credentials are invalid', async () => {
            const loginInfo: LoginDto = {
                phone: '+919988556677',
                password: 'invalidPassword',
            };
            jest.spyOn(authService, 'logIn').mockRejectedValue(
                new UnauthorizedException(),
            );

            await expect(controller.login(loginInfo)).rejects.toThrow(
                UnauthorizedException,
            );
        });
    });
});
