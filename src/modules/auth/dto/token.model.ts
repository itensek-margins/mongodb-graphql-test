import { ObjectType } from 'type-graphql';
import { IToken } from '../interface/token.interface';

@ObjectType()
export class TokenModel implements IToken {
  accessToken: string;
}
