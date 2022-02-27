import { Controller, Get, Post, Put, Delete, Body } from '@nestjs/common';
import { DomainService } from './domain.service';
import { Domain } from './domain.model';

@Controller('domain')
export class DomainController {
  constructor(private readonly service: DomainService) {}

  @Get('search')
  async search(): Promise<Domain[]> {
    return await this.service.getDomainList()
  }

  @Post('add')
  async add(@Body() createDomainDto: Domain): Promise<Domain> {
    return await this.service.addDomain(createDomainDto);
  }

  @Put('edit')
  async edit(): Promise<any> {
    console.log(1111);
  }

  @Delete('delete')
  async delete(): Promise<any> {
    console.log(1111);
  }
}
