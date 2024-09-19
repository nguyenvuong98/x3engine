import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';
import { RolesService } from '../roles/roles.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        ],
    controllers: [UserController],
    providers: [UserRepository, 
        UserService],
    exports: [UserService]
})
export class UserModule {}
