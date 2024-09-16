import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserDto, UserRegiterRequestDdto } from '../user/user.dto';
import { UserService } from '../user/user.service';
import { SignIdRequestDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
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
        type: UserDto 
    })
    @Post('/register')
    registerUser(@Body() userRegister: UserRegiterRequestDdto) {
        return this.userService.registerUser(userRegister)
    }


    @ApiOperation({
        operationId: 'Sign in',
        description: 'Sign in',
      })
    @ApiResponse({ status: HttpStatus.OK, 
        description: 'Sign in successfully.', 
        type: UserDto 
    })
    @Post('/sign-in')
    signIn(@Body() signInReq: SignIdRequestDto) {
        return this.authService.SignIn(signInReq)
    }
}
