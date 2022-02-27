import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Domain } from './domain.model';

@Injectable()
export class DomainService {
    constructor(
        @InjectModel(Domain)
        private domainModel: typeof Domain
    ) {}

    async getDomainList(): Promise<Domain[]> {
        return this.domainModel.findAll()
    }

    async addDomain(params) : Promise<Domain> {
        return this.domainModel.create(params);
    }
}
