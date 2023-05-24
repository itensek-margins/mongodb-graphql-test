import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Min,
} from 'class-validator';
import { IEmployee } from '../interface/employee.interface';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class EmployeeInput implements IEmployee {
  @Field({ nullable: false })
  @IsString({ message: 'Name should be a string' })
  @IsNotEmpty({ message: 'Please provide name' })
  name: string;

  @Field({ nullable: false })
  @IsNumber({}, { message: 'Age should be a number' })
  @IsNotEmpty({ message: 'Please provide age' })
  @Min(18, { message: 'Minimum age allowed is 18' })
  age: number;

  @Field({ nullable: false })
  @IsEmail({}, { message: 'Email is not valid' })
  @IsNotEmpty({ message: 'Please provide e-mail address' })
  email: string;

  @Field({ nullable: true })
  @IsString({ message: 'Address should be a string' })
  @IsOptional()
  address: string;

  @Field({ nullable: false })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Please provide password' })
  @Matches(
    RegExp('(?=^.{8,}$)((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'),
    {
      message:
        'Password must be at least 8 characters long including one uppercase letter, one special character and alphanumeric characters',
    },
  )
  password: string;

  @Field({ nullable: true, defaultValue: false })
  @IsOptional()
  isVerified: boolean;
}
