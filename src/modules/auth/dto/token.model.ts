import { IToken } from '../interface/token.interface';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TokenModel implements IToken {
  @Field()
  accessToken: string;
}
