import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Min,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { IEmployeeEditableAttributes } from '../interface/employee-editable-atributtes.interface';

@InputType()
export class EmployeeUpdateInput implements IEmployeeEditableAttributes {
  @Field({ nullable: true })
  @IsString({ message: 'Name should be a string' })
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsNumber({}, { message: 'Age should be a number' })
  @Min(18, { message: 'Minimum age allowed is 18' })
  @IsOptional()
  age?: number;

  @Field({ nullable: true })
  @IsEmail({}, { message: 'Email is not valid' })
  @IsOptional()
  email?: string;

  @Field({ nullable: true })
  @IsString({ message: 'Address should be a string' })
  @IsOptional()
  address?: string;

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
  password?: string;
}
