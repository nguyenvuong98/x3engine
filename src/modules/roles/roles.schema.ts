import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { DbModel } from 'src/share/constants';

export type RolesDocument = HydratedDocument<Roles>;

@Schema({collection: DbModel.ROLES, timestamps: true})
export class Roles {
    @Prop()
    name: string;

    @Prop()
    permission: string;

    @Prop()
    createdBy: string;
}


export const RolesSchema = SchemaFactory.createForClass(Roles);