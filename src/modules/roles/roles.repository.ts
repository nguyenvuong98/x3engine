import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DbModel } from "src/share/constants";
import { Roles } from "./roles.schema";
import { BaseRepository } from "src/share/base.repository";

export class RolesRepository extends BaseRepository{
    constructor(@InjectModel(DbModel.ROLES) model: Model<Roles>){
        super(model)
    }
}