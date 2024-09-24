import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserAddPermissionInput, UserDto, UserRegiterRequestDdto } from './user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { UserRole, UserStatus } from './user.interface';
import { JwtService } from '@nestjs/jwt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager'
import { ConfigService } from '@nestjs/config';
import * as _ from 'lodash'
import { USER_PICK_KEYS } from './user.constants';
import { ProjectPermission } from 'src/share/roles';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository,
                private jwtService: JwtService,
                @Inject(CACHE_MANAGER) private cacheManager: Cache,
                private configService: ConfigService) {
    }

    async registerUser (userRegister: UserRegiterRequestDdto): Promise<UserDto> {
        // check exist email or username
        const query = {}
        query['$or'] = [
            { username: userRegister.username },
            { email: userRegister.email }
        ]

        const existUser = await this.userRepository.findOne(query)

        if (existUser) {
            throw new HttpException('User exist', HttpStatus.BAD_REQUEST)
        }

        //hasing
        const hash = await bcrypt.hash(userRegister.password, this.configService.get('saltOrRound'));
        
        const newUser = {
            username: userRegister.username,
            passwordHash: hash,
            email: userRegister.email,
            status: UserStatus.ACTIVE,
            role: UserRole.STANDARD_USER,
            firstName: userRegister.firstName,
            middleName: userRegister.middleName,
            lastName: userRegister.lastName,
            permissions: this.getDefaultPermission()
        }

        const user = await this.userRepository.create(newUser)
       
        const accessToken = await this.createToken(user)
        const response =  _.pick({id: user._id.toString(),...user, accessToken}, USER_PICK_KEYS)
        
        this.cacheManager.set(accessToken, JSON.stringify(response), parseInt(this.configService.get('jwt.jwtExpireTime').toString()))

        return response
    }

    async findOne(query = {}): Promise<any> {
        return this.userRepository.findOne(query);
    }

    async createToken(user: any) {
        if (!user || !user.username|| !user.passwordHash || !user.status ||!user._id) {
            throw new UnauthorizedException()
        }

        const payload = { id: (user.id || user._id), username: user.username, email: user.email, permissions: user.permissions};
        const accessToken = await this.jwtService.signAsync(payload, {secret: this.configService.get('jwt.jwtSecretKey')})

        return accessToken
    }

    async addPermission(input: UserAddPermissionInput) {
        const user = await this.userRepository.findOne({email: input.email})

        if (!user) {
            throw new HttpException('User not exist', HttpStatus.BAD_REQUEST)
        }

        const queryUpdate = {
            '$addToSet': {
                permissions: {
                    '$each': input.permissions
                }
            }
        }
        const updatePermission = await this.userRepository.updateOne({email: input.email}, queryUpdate)

        return updatePermission;
    }

    getDefaultPermission() {
        const defaultPermission = [
            ProjectPermission.PROJECT_CREATE,
            ProjectPermission.PROJECT_DELETE,
            ProjectPermission.PROJECT_UPDATE
        ]

        return defaultPermission
    }
}
