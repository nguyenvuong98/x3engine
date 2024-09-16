import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import {IsOptional, IsString, IsEmail, IsNotEmpty, IsEnum} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';
import { UserRole, UserStatus } from './user.interface';
import { DbModel } from 'src/share/constants';

export type UserDocument = HydratedDocument<User>;

@Schema({collection: DbModel.USER})
export class User {
    @Prop()
    username: string;

    @Prop()
    passwordHash: string;

    @Prop()
    email: string;

    @Prop()
    status: UserStatus;

    @Prop()
    role: UserRole;

    @Prop()
    firstName: string;

    @Prop()
    middleName: string;

    @Prop()
    lastName: string;

    @Prop({default: 1}) // 1: active, 2:deleted
    isDelete: Number;

    @Prop({default: getNewTimeStamp()})
    createdAt: Number;

    @Prop({default: getNewTimeStamp()})
    updatedAt: Number;
}


export const UserSchema = SchemaFactory.createForClass(User);