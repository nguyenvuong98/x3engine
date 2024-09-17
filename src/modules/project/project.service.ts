import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProjectRepository } from './project.repository';

@Injectable()
export class ProjectService {
    constructor(private readonly projectRepository: ProjectRepository) {}

    async createProject(userId:string, name: string) {
        const existProject = await this.projectRepository.findOne({userCreated: userId, name})
        if (existProject) {
            throw new HttpException('project_name has exist', HttpStatus.BAD_REQUEST)
        }

        const project = await this.projectRepository.create({userCreated: userId, name})

        return project.toObject()
    }

    async updateProject(userId:string, bodyReq: any) {
        const projectId = bodyReq.id;
        delete bodyReq.id

        const project = await this.projectRepository.update({_id: projectId, userCreated: userId}, bodyReq)

        return project
    }

    async deleteProject(userId:string, projectId:string) {
        const project = await this.projectRepository.deleteMany({_id: projectId, userCreated: userId})

        return project
    }
}
