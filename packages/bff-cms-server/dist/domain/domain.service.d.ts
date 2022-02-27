import { Domain } from './domain.model';
export declare class DomainService {
    private domainModel;
    constructor(domainModel: typeof Domain);
    getDomainList(): Promise<Domain[]>;
    addDomain(params: any): Promise<Domain>;
}
