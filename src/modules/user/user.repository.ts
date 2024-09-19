import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DbModel } from "src/share/constants";
import { UserDto } from "./user.dto";
import { User } from "./user.schema";
import { BaseRepository } from "src/share/base.repository";

@Injectable()
export class UserRepository extends BaseRepository {
    constructor(@InjectModel(DbModel.USER) model: Model<User>){
        super(model)
    }

    // async create(user: any) {
    //     return this.model.create(user)
    // }

    // async updateOne(queryuser: any) {
    //     return this.model.updateOne(user)
    // }

    // async findOne(user: any = {}) {
    //     return this.model.findOne(user)
    // }
}