import { 
    Column, 
    Model, 
    Table, 
    CreatedAt, 
    UpdatedAt,
    Index,
    AllowNull
} from 'sequelize-typescript';

@Table
export class Domain extends Model<Domain> {

  @Index('id')

  @AllowNull(false)
  @Column
  domainUrl: string;

  @Column
  domainDesc: string;

  @Column
  creator: string;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;
}