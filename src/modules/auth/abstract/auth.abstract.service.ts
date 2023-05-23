import { Logger } from '@nestjs/common';
import { AbstractEmployeeRepository } from 'src/modules/employee/abstract/employee.abstract.repository';

export abstract class AbstractAuthService {
  protected constructor(
    protected readonly _logger: Logger,
    protected readonly _repository: AbstractEmployeeRepository,
  ) {}

  abstract login(...args: any[]): Promise<void>;
  abstract logout(...args: any[]): Promise<void>;
}
