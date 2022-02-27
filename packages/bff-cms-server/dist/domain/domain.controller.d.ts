import { DomainService } from './domain.service';
import { Domain } from './domain.model';
export declare class DomainController {
    private readonly service;
    constructor(service: DomainService);
    search(): Promise<Domain[]>;
    add(createDomainDto: Domain): Promise<Domain>;
    edit(): Promise<any>;
    delete(): Promise<any>;
}
