import { Model } from 'sequelize-typescript';
export declare class Domain extends Model<Domain> {
    domainUrl: string;
    domainDesc: string;
    creator: string;
    creationDate: Date;
    updatedOn: Date;
}
