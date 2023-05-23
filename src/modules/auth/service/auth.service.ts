import { Injectable, Inject, Logger } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AbstractEmployeeRepository } from 'src/modules/employee/abstract/employee.abstract.repository';
import { AbstractAuthService } from '../abstract/auth.abstract.service';
import { IEmployee } from 'src/modules/employee/interface/employee.interface';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RootConfig } from 'src/common/config/env.validation';

@Injectable()
export class AuthService extends AbstractAuthService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) logger: Logger,
    employeeRepository: AbstractEmployeeRepository,
    private readonly jwtService: JwtService,
    private readonly config: RootConfig,
  ) {
    super(logger, employeeRepository);
  }
  async login(email: string, password: string): Promise<void> {
    const employee = await this._repository.findOne({ email: email });
    if (employee) {
      this.checkPassword(employee, password);
    }
  }

  async logout(...args: any[]): Promise<void> {
    throw new Error('Method not implemented.');
  }

  private checkPassword(employee: IEmployee, password: string) {
    bcrypt.compare(
      password,
      employee.password,
      (err: Error, result: boolean) => {
        employee.isVerified = result;
      },
    );
  }

  private async generateToken(employee: IEmployee) {
    const payload = { email: employee.email };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.config.database.SECRET_KEY,
      }),
    };
  }
}
