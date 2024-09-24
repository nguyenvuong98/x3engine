export class BaseRepository {
    constructor(private readonly  model: any){}

    async create(data = {}) {
        const response = await this.model.create(data);
        return response.toObject()
    }

    async find(query = {}) {
        return this.model.find(query);
    }

    async findOne(query = {}) {
        return this.model.findOne(query);
    }

    async updateOne(query= {}, data = {}, option = {}) {
        return this.model.updateOne(query, data, option);
    }

    async updateMany(query= {}, data = {}, option = {}) {
        return this.model.updateMany(query, data, option);
    }

    async deleteMany(query= {}) {
        return this.model.deleteMany(query);
    }
}