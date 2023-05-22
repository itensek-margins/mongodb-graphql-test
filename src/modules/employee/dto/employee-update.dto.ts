import { IsEmail, IsNumber, IsOptional, IsString, Min } from 'class-validator';
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
}
