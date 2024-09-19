import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserAddPermissionInput, UserDto, UserRegiterRequestDdto } from './user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {

    }

    @ApiOperation({
        operationId: 'Add permission',
        description: 'Add permissionr',
      })
    @ApiResponse({ status: HttpStatus.OK, 
        description: 'The permission has been successfully created.', 
        type: () => UserDto 
    })
    @Post('/add-permission')
    addPermissions(@Body() input: UserAddPermissionInput) {
        return this.userService.addPermission(input)
    }
}
