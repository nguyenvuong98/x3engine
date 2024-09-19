import { Body, Controller, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto, UserRegiterRequestDdto } from '../user/user.dto';
import { UserService } from '../user/user.service';
import { SignIdRequestDto } from './auth.dto';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { ACCESS_TOKEN_HEADER_NAME } from 'src/share/constants';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly userService: UserService,
                private readonly authService: AuthService) {

    }

    @ApiOperation({
        operationId: 'Register user',
        description: 'Register user',
      })
    @ApiResponse({ status: HttpStatus.OK, 
        description: 'The user has been successfully created.', 
        type: () => UserDto 
    })
    @Post('/register')
    registerUser(@Body() userRegister: UserRegiterRequestDdto): Promise<UserDto> {
        return  this.userService.registerUser(userRegister)
    }


    @ApiOperation({
        operationId: 'Sign in',
        description: 'Sign in',
      })
    @ApiResponse({ status: HttpStatus.OK, 
        description: 'Sign in successfully.', 
        type: () => UserDto 
    })
    @Post('/sign-in')
    signIn(@Body() signInReq: SignIdRequestDto) {
        return this.authService.SignIn(signInReq)
    }

    @ApiOperation({
        operationId: 'Log out',
        description: 'Log out',
      })
    @ApiResponse({ status: HttpStatus.OK, 
        description: 'Log out successfully.',
    })
    @UseGuards(AuthGuard)
    @ApiBearerAuth('access-token')
    @Post('/log-out')
    Logout(@Req() request: Request) {
        return this.authService.LogOut(request[ACCESS_TOKEN_HEADER_NAME])
    }
}
