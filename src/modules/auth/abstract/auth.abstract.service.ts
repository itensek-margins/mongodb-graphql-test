import { Logger } from '@nestjs/common';
import { AbstractEmployeeRepository } from 'src/modules/employee/abstract/employee.abstract.repository';
import { ILogin } from '../interface/login.interface';
import { IToken } from '../interface/token.interface';

export abstract class AbstractAuthService {
  protected constructor(
    protected readonly _logger: Logger,
    protected readonly _repository: AbstractEmployeeRepository,
  ) {}

  abstract login(loginInput: ILogin): Promise<IToken>;
  abstract validateAccessToken(accessToken: string): Promise<any>;
}
