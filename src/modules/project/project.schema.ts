import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { getNewTimeStamp} from '../../share/helper'
import { DbModel } from 'src/share/constants';

export type UserDocument = HydratedDocument<Project>;

@Schema({collection: DbModel.PROJECT, timestamps: true})
export class Project {
    @Prop()
    name: string;

    @Prop()
    userCreated: string;

    @Prop({default: 1}) // 1: active, 2:deleted
    isDelete: Number;
}


export const ProjectSchema = SchemaFactory.createForClass(Project);