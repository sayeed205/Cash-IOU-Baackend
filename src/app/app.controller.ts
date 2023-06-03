import { Controller, Get, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import {
    ApiBearerAuth,
    ApiResponse,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserDocument } from 'src/auth/schemas';
import { GetUser } from 'src/utilities/decorators';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello() {
        return this.appService.getHello();
    }

    @Get('whoami')
    @UseGuards(AuthGuard())
    @ApiResponse({ status: 200, description: 'Returns user details' })
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({
        description: 'JWT expired or not provided or invalid',
    })
    whoAmI(@GetUser() user: UserDocument) {
        return this.appService.whoAmI(user);
    }
}
