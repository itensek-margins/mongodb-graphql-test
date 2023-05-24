import { Injectable, Inject, Logger } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AbstractEmployeeRepository } from 'src/modules/employee/abstract/employee.abstract.repository';
import { AbstractAuthService } from '../abstract/auth.abstract.service';
import { IEmployee } from 'src/modules/employee/interface/employee.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IToken } from '../interface/token.interface';
import { ILogin } from '../interface/login.interface';
import {
  TestProjectNotFoundException,
  TestProjectValidationException,
} from 'src/common/exceptions/custom.exception';

@Injectable()
export class AuthService extends AbstractAuthService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) logger: Logger,
    employeeRepository: AbstractEmployeeRepository,
    private readonly jwtService: JwtService,
  ) {
    super(logger, employeeRepository);
  }

  async login(loginInput: ILogin): Promise<IToken> {
    const employeeToVerify = await this._repository.findOne({
      email: loginInput.email,
    });
    if (employeeToVerify) {
      const employee = await this.verifyEmployee(
        employeeToVerify,
        loginInput.password,
      );
      if (employee.isVerified) {
        await this._repository.updateOneById(employeeToVerify.id, employee);
        return await this.generateToken(employee);
      } else {
        throw new TestProjectValidationException('Employee is not verified');
      }
    }
  }

  async logout(employeeId: string): Promise<boolean> {
    const employee = await this._repository.findOne({ id: employeeId });
    if (employee) {
      employee.isVerified = false;
      await this._repository.updateOneById(employee.id, employee);
      return true;
    } else {
      throw new TestProjectNotFoundException("Employee doesn't exist");
    }
  }

  async validateAccessToken(accessToken: string): Promise<any> {
    const decodedToken = await this.jwtService.verifyAsync(accessToken);
    if (decodedToken) {
      return decodedToken;
    } else {
      throw new TestProjectValidationException('Invalid token');
    }
  }

  private async verifyEmployee(
    employee: IEmployee,
    password: string,
  ): Promise<IEmployee> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(
        password,
        employee.password,
        (err: Error, result: boolean) => {
          if (err) {
            reject(err);
          } else {
            employee.isVerified = result;
            resolve(employee);
          }
        },
      );
    });
  }

  private async generateToken(employee: IEmployee): Promise<IToken> {
    const payload = { email: employee.email };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
