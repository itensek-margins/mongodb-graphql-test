import { Inject, Injectable, Logger } from '@nestjs/common';
import { AbstractEmployeeService } from '../abstract/employee.abstract.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AbstractEmployeeRepository } from '../abstract/employee.abstract.repository';
import { IEmployee } from '../interface/employee.interface';
import { Employee } from '../schema/employee.schema';
import { FilterQuery, QueryOptions } from 'mongoose';
import {
  TestProjectConflictException,
  TestProjectNotFoundException,
} from 'src/common/exceptions/custom.exception';

@Injectable()
export class EmployeeService extends AbstractEmployeeService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) logger: Logger,
    employeeRepository: AbstractEmployeeRepository,
  ) {
    super(logger, employeeRepository);
  }

  async create(employee: IEmployee): Promise<IEmployee> {
    const emailCount = await this._repository.count({ email: employee.email });
    if (emailCount) {
      throw new TestProjectConflictException('Email already exists');
    }
    return await this._repository.createOne(employee);
  }

  async findMany(
    filter: FilterQuery<Employee> = {},
    projection: string | null = null,
    options?: QueryOptions,
  ): Promise<IEmployee[]> {
    return await this._repository.findManyLean(filter, projection, options);
  }

  async findOne(id: string): Promise<IEmployee> {
    const employee = await this._repository.findOne({ _id: id });
    if (!employee) {
      throw new TestProjectNotFoundException(
        'Employee with the given id does not exist',
      );
    }
    return employee;
  }

  async updateOne(id: string, input: IEmployee): Promise<IEmployee> {
    const updatedEmployee = await this._repository.updateOneById(id, input);
    if (!updatedEmployee) {
      throw new TestProjectNotFoundException(
        'Employee with the given id does not exist',
      );
    }
    return updatedEmployee;
  }

  async delete(id: string): Promise<IEmployee | void> {
    const deletedEmployee = await this._repository.deleteOne({ _id: id });
    if (!deletedEmployee) {
      throw new TestProjectNotFoundException(
        'Employee with the given id does not exist',
      );
    }
    return deletedEmployee;
  }
}
