import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../user/user.repository';
import { User, UserSchema } from '../user/user.schema';
import { UserService } from '../user/user.service';
import { jwtExpireTime, jwtSecret } from './auth.constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    
    //ConfigModule
   
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    UserRepository, 
    UserService]
})
export class AuthModule {}
