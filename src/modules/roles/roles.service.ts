import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RolesRepository } from './roles.repository';
import { RoleInputDto } from './roles.dto';

@Injectable()
export class RolesService {
    constructor(private readonly rolesRepository: RolesRepository) {
    }

    async createRole(userId, roleInput: RoleInputDto) {
        const queryExistRole = {
            '$or': [
                {name: roleInput.name},
                {permission: roleInput.permission}
            ]
        }

        const existRole = await this.findOne(queryExistRole)

        if (existRole) {
            throw new HttpException('Role exist', HttpStatus.BAD_REQUEST)
        }


        const role = await this.rolesRepository.create({createdBy: userId, ...roleInput})

        return role;
    }

    async deleteRole(roleId: string) {
        const role = await this.rolesRepository.deleteMany({_id: roleId})

        return role
    }

    async findOne(query = {}) {
        return await this.rolesRepository.findOne(query)
    }
}
