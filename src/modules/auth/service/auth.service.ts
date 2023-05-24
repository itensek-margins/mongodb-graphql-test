import { Injectable, Inject, Logger } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AbstractEmployeeRepository } from 'src/modules/employee/abstract/employee.abstract.repository';
import { AbstractAuthService } from '../abstract/auth.abstract.service';
import { IEmployee } from 'src/modules/employee/interface/employee.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IToken } from '../interface/token.interface';
import { ILogin } from '../interface/login.interface';
import { TestProjectValidationException } from 'src/common/exceptions/custom.exception';

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
    const isPasswordValid = loginInput.password
      ? await bcrypt.compare(loginInput.password, employeeToVerify.password)
      : false;

    if (!employeeToVerify || !isPasswordValid) {
      throw new TestProjectValidationException('Invalid credentials');
    }
    return await this.generateToken(employeeToVerify);
  }

  async validateAccessToken(accessToken: string): Promise<any> {
    const decodedToken = await this.jwtService.verifyAsync(accessToken);
    if (decodedToken) {
      return decodedToken;
    } else {
      throw new TestProjectValidationException('Invalid token');
    }
  }

  private async generateToken(employee: IEmployee): Promise<IToken> {
    const payload = { email: employee.email };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
