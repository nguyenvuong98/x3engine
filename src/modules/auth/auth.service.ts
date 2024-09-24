import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager'
import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto } from '../user/user.dto';
import { UserService } from '../user/user.service';
import { ComparePassword, jwtExpireTime } from './auth.constants';
import { SignIdRequestDto } from './auth.dto';
import { UserStatus } from '../user/user.interface';
import { USER_PICK_KEYS } from '../user/user.constants';
import * as _ from 'lodash'
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(private userService: UserService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private configService: ConfigService) {
        
    }

    async SignIn(request: SignIdRequestDto):Promise<UserDto> {
        const user = await this.userService.findOne({username: request.username});

        if (!user?.passwordHash || !user?.isDelete) {
            throw new UnauthorizedException();
        }
        user.status = UserStatus.ACTIVE
        user.save()
        const userObject = user.toObject()
        const mathPassword = await ComparePassword(request.password, user.passwordHash)

        if (!mathPassword) {
            throw new BadRequestException();
        }

        const accessToken = await this.userService.createToken(user)
        const response =  _.pick({id: userObject._id.toString(),...userObject, accessToken}, USER_PICK_KEYS)
        
        await this.cacheManager.set(accessToken, JSON.stringify(response), parseInt(this.configService.get('jwt.jwtExpireTime').toString()))
        //const cacheData = await this.cacheManager.get(accessToken)
        
        return response;
    }

    async LogOut(accessToken: string) {
        const cacheData = await this.cacheManager.get(accessToken)

        if (!cacheData) {
            throw new BadRequestException();
        }

        const authData = JSON.parse(cacheData as string)

        const user = await this.userService.findOne({username: authData?.username});

        user.status = UserStatus.INACTIVE
        await user.save()

        await this.cacheManager.del(accessToken)

        return {message: 'Log out successfully'};
    }
}
