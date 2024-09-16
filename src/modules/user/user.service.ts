import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto, UserRegiterRequestDdto } from './user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { saltRounds } from 'src/share/constants';
import { UserRole, UserStatus } from './user.interface';
import { JwtService } from '@nestjs/jwt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager'
import { jwtExpireTime } from '../auth/auth.constants';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository,
                private jwtService: JwtService,
                @Inject(CACHE_MANAGER) private cacheManager: Cache) {
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
            throw new Error('User exist')
        }

        //hasing
        const hash = await bcrypt.hash(userRegister.password, saltRounds);
        
        const newUser = {
            username: userRegister.username,
            passwordHash: hash,
            email: userRegister.email,
            status: UserStatus.ACTIVE,
            role: UserRole.STANDARD_USER,
            firstName: userRegister.firstName,
            middleName: userRegister.middleName,
            lastName: userRegister.lastName,
        }

        const user = await this.userRepository.create(newUser)

        const accessToken = await this.createToken(user)
        // const response = {id: user._id.toString(),...user, accessToken}
        
        // this.cacheManager.set(accessToken, JSON.stringify(response), parseInt(jwtExpireTime.toString()))

        return {id: user._id.toString(),...user, accessToken}
    }

    async findOne(query = {}): Promise<any> {
        return this.userRepository.findOne(query);
    }

    async createToken(user: any) {
        if (!user || !user.username|| !user.passwordHash || !user.status ||!user.id) {
            throw new UnauthorizedException()
        }

        const payload = { userId: user.id, username: user.username, email: user.email};
        const accessToken = await this.jwtService.signAsync(payload)

        return accessToken
    }

}
