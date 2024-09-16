import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DbModel } from "src/share/constants";
import { UserDto } from "./user.dto";
import { User } from "./user.schema";

@Injectable()
export class UserRepository {
    constructor(@InjectModel(DbModel.USER)private model: Model<User>){}

    async create(user: any) {
        return this.model.create(user)
    }

    async update(user: UserDto) {
        return this.model.updateOne(user)
    }

    async findOne(user: any = {}) {
        return this.model.findOne(user)
    }
}