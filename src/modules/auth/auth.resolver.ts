import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';
import { LoginInput } from './dto/login.dto';
import { AbstractAuthResolver } from './abstract/auth.abstract.resolver';
import { AbstractAuthService } from './abstract/auth.abstract.service';
import { TokenModel } from './dto/token.model';
import { JwtDecodedModel } from './dto/jwt-decoded.model';

@Resolver(() => LoginInput)
export class AuthResolver extends AbstractAuthResolver {
  constructor(authService: AbstractAuthService) {
    super(authService);
  }

  @Mutation(() => TokenModel, { name: 'login' })
  async login(@Args('loginInput') loginInput: LoginInput): Promise<TokenModel> {
    return this._service.login(loginInput);
  }

  @Query(() => JwtDecodedModel, { name: 'validateToken' })
  async validateToken(@Args('token') token: string): Promise<JwtDecodedModel> {
    return this._service.validateAccessToken(token);
  }
}
