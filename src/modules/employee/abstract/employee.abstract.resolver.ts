import { IEmployee } from '../interface/employee.interface';
import { AbstractEmployeeService } from './employee.abstract.service';

export abstract class AbstractEmployeeResolver {
  constructor(protected readonly _service: AbstractEmployeeService) {}

  abstract createEmployee(employeeInput: IEmployee): Promise<IEmployee>;

  abstract getEmployees(): Promise<IEmployee[]>;

  abstract getEmployee(id: string): Promise<IEmployee>;

  abstract updateEmployee(
    id: string,
    employeeInput: Partial<IEmployee>,
  ): Promise<IEmployee>;

  abstract deleteEmployee(id: string): Promise<IEmployee | void>;
}
