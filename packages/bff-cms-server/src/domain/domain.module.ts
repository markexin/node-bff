import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Domain } from './domain.model';
import { DomainController } from './domain.controller';
import { DomainService } from './domain.service';

@Module({
  imports: [SequelizeModule.forFeature([Domain])],
  providers: [DomainService],
  controllers: [DomainController],
})
export class DomainModule {}