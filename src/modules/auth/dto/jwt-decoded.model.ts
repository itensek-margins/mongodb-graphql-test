import { IJwtDecoded } from '../interface/jwt-decoded.interface';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JwtDecodedModel implements IJwtDecoded {
  @Field()
  email: string;

  @Field()
  iat: number;

  @Field()
  exp: number;
}
