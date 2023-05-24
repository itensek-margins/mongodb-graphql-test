import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';
import { LoginInput } from './dto/login.dto';
import { AbstractAuthResolver } from './abstract/auth.abstract.resolver';
import { ILogin } from './interface/login.interface';
import { IToken } from './interface/token.interface';
import { AbstractAuthService } from './abstract/auth.abstract.service';
import { TokenModel } from './dto/token.model';

@Resolver(() => LoginInput)
export class AuthResolver extends AbstractAuthResolver {
  constructor(authService: AbstractAuthService) {
    super(authService);
  }

  @Mutation(() => TokenModel, { name: 'login' })
  async login(@Args('loginInput') loginInput: ILogin): Promise<IToken> {
    return this._service.login(loginInput);
  }

  @Query(() => String, { name: 'validateToken' })
  async validateToken(@Args('token') token: string): Promise<any> {
    return this._service.validateAccessToken(token);
  }

  @Mutation(() => Boolean, { name: 'logout' })
  async logout(@Args('userId') employeeId: string): Promise<boolean> {
    return await this._service.logout(employeeId);
  }
}
