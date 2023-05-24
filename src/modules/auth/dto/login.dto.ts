import { Field, InputType } from '@nestjs/graphql';
import { ILogin } from '../interface/login.interface';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class LoginInput implements ILogin {
  @Field({ nullable: false })
  @IsString({ message: 'Email should be a string' })
  @IsNotEmpty({ message: 'Please provide email' })
  email: string;

  @Field({ nullable: false })
  @IsString({ message: 'Password should be a string' })
  @IsNotEmpty({ message: 'Please provide password' })
  password: string;
}
