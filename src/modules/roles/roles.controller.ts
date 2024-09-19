import { Body, Controller, Delete, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleDeleteInputDto, RoleDto, RoleInputDto } from './roles.dto';
import { RolesService } from './roles.service';
import { USER_DETAIL_HEADER_NAME } from 'src/share/constants';

@UseGuards(AuthGuard)
@ApiBearerAuth('access-token')
@ApiTags('Roles')
@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService){}

    @ApiOperation({
        operationId: 'Create role',
        description: 'Create role',
      })
    @ApiResponse({ status: HttpStatus.OK, 
        description: 'The role has been successfully created.', 
        type: () => RoleDto 
    })
    @Post('/')
    createRole(@Body() roleBody: RoleInputDto, @Req() req:Request) {
        return this.rolesService.createRole(req[USER_DETAIL_HEADER_NAME].id, roleBody)
    }

    @ApiOperation({
        operationId: 'Delete role',
        description: 'Delete role',
      })
    @ApiResponse({ status: HttpStatus.OK, 
        description: 'The role has been successfully deleted.', 
    })
    @Delete('/')
    deleteRole(@Body() roleBody: RoleDeleteInputDto) {
        return this.rolesService.deleteRole(roleBody.id)
    }
}
