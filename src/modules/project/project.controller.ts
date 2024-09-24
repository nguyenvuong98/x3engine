import { Body, Controller, Delete, HttpStatus, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ProjectCreateRequestDto, ProjectDeleteRequestDto, ProjectDto, ProjectUpdateRequestDto } from './project.dto';
import { Request } from 'express';
import { ProjectService } from './project.service';
import { USER_DETAIL_HEADER_NAME } from 'src/share/constants';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorators';
import { RolesGuard } from 'src/guards/roles.guard';
import { ProjectPermission } from 'src/share/roles';

@UseGuards(AuthGuard,RolesGuard)
@ApiBearerAuth('access-token')
@Controller('project')
@ApiTags('Project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @Roles([ProjectPermission.PROJECT_CREATE])
    @ApiOperation({
        operationId: 'Create project',
        description: 'Create project',
      })
    @ApiResponse({ status: HttpStatus.OK, 
        description: 'The project has been successfully created.', 
        type: () => ProjectDto 
    })
    @Post('/')
    createProject(@Body() projectReq: ProjectCreateRequestDto, @Req() req:Request) {
        return this.projectService.createProject(req[USER_DETAIL_HEADER_NAME].id, projectReq.name)
    }

    @Roles([ProjectPermission.PROJECT_UPDATE])
    @ApiOperation({
        operationId: 'Update project',
        description: 'Update project',
      })
    @ApiResponse({ status: HttpStatus.OK, 
        description: 'The project has been successfully updated.', 
    })
    @Put('/')
    updateProject(@Body() projectReq: ProjectUpdateRequestDto, @Req() req:Request) {
        return this.projectService.updateProject(req[USER_DETAIL_HEADER_NAME].id, projectReq)
    }

    @Roles([ProjectPermission.PROJECT_DELETE])
    @ApiOperation({
        operationId: 'Delete project',
        description: 'delete project',
      })
    @ApiResponse({ status: HttpStatus.OK, 
        description: 'The project has been successfully deleted.', 
    })
    @Delete('/')
    deleteProject(@Body() projectReq: ProjectDeleteRequestDto, @Req() req:Request) {
        return this.projectService.deleteProject(req[USER_DETAIL_HEADER_NAME].id, projectReq.id)
    }
}
