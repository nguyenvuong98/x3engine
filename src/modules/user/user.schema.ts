import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { getNewTimeStamp} from '../../share/helper'
import { UserRole, UserStatus } from './user.interface';
import { DbModel } from 'src/share/constants';

export type UserDocument = HydratedDocument<User>;

@Schema({collection: DbModel.USER, timestamps: true})
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

    @Prop()
    permissions: string[];

    @Prop({default: 1}) // 1: active, 2:deleted
    isDelete: Number;
}


export const UserSchema = SchemaFactory.createForClass(User);