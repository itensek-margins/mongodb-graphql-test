import { ILogin } from '../interface/login.interface';
import { IToken } from '../interface/token.interface';
import { AbstractAuthService } from './auth.abstract.service';

export abstract class AbstractAuthResolver {
  constructor(protected readonly _service: AbstractAuthService) {}

  abstract login(loginInput: ILogin): Promise<IToken>;
  abstract validateToken(token: string): Promise<any>;
}
