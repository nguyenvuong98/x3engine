import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto, UserRegiterRequestDdto } from './user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {

    }

    // @ApiOperation({
    //     operationId: 'Register user',
    //     description: 'Register user',
    //   })
    // @ApiResponse({ status: HttpStatus.OK, 
    //     description: 'The user has been successfully created.', 
    //     type: () => UserDto 
    // })
    // @Post()
    // registerUser(@Body() userRegister: UserRegiterRequestDdto) {
    //     return this.userService.registerUser(userRegister)
    // }
}
