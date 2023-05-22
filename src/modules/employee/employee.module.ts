import { Module } from '@nestjs/common';
import { EmployeeSchema } from './schema/employee.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AbstractEmployeeRepository } from './abstract/employee.abstract.repository';
import { AbstractEmployeeService } from './abstract/employee.abstract.service';
import { EmployeeService } from './service/employee.service';
import { EmployeeRepositoryService } from './service/employee-repository.service';
import { EmployeeResolver } from './employee.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Employee', schema: EmployeeSchema }]),
  ],
  controllers: [],
  providers: [
    EmployeeRepositoryService,
    EmployeeService,
    EmployeeResolver,
    {
      provide: AbstractEmployeeRepository,
      useExisting: EmployeeRepositoryService,
    },
    {
      provide: AbstractEmployeeService,
      useExisting: EmployeeService,
    },
  ],
  exports: [AbstractEmployeeService, AbstractEmployeeRepository],
})
export class EmployeeModule {}
