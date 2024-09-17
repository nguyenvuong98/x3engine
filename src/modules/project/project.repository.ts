import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DbModel } from "src/share/constants";
import { Project } from "./project.schema";

@Injectable()
export class ProjectRepository {
    constructor(@InjectModel(DbModel.PROJECT)private model: Model<Project>) {
    }
    
    async create(project: any) {
        return this.model.create(project)
    }

    async update(filter = {},project: any = {}): Promise<any>{
        return this.model.updateOne(filter, project)
    }

    async findOne(project: any = {}) {
        return this.model.findOne(project)
    }

    async deleteMany(filter= {}) {
        return this.model.deleteMany(filter)
    }
}