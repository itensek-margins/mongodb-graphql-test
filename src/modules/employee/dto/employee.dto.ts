import { IsEmail, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { IEmployee } from '../interface/employee.interface';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class EmployeeInput implements IEmployee {
  @Field()
  @IsString({ message: 'Name should be a string' })
  @IsNotEmpty({ message: 'Please provide name' })
  name: string;

  @Field()
  @IsNumber()
  @IsNotEmpty({ message: 'Please provide age' })
  @Min(18)
  age: number;

  @Field()
  @IsEmail()
  @IsNotEmpty({ message: 'Please provide e-mail address' })
  email: string;

  @Field()
  @IsString({ message: 'Address should be a string' })
  @IsNotEmpty({ message: 'Please provide address' })
  address: string;
}
