import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';
import { jwtExpireTime, jwtSecret } from './auth.constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports:[
    JwtModule.register({
      global: true,
      secret: jwtSecret,
      signOptions: { expiresIn: `${jwtExpireTime}s` },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, UserService]
})
export class AuthModule {}
