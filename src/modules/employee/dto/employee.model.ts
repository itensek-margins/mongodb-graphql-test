import { ObjectType, Field } from '@nestjs/graphql';
import { IEmployee } from '../interface/employee.interface';
import { Types } from 'mongoose';

@ObjectType()
export class EmployeeModel implements IEmployee {
  @Field(() => String)
  _id?: string | Types.ObjectId;

  @Field()
  name: string;

  @Field()
  age: number;

  @Field()
  email: string;

  @Field({ nullable: true })
  address?: string;

  @Field()
  password: string;

  @Field()
  isVerified: boolean;
}
