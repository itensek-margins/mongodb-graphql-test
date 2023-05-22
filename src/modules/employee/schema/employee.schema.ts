import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IEmployee } from '../interface/employee.interface';

export type EmployeeDocument = HydratedDocument<Employee>;

@Schema({ timestamps: true})
export class Employee implements IEmployee{
  @Prop({
    required: true,
    type: String
  })
  name: string;

  @Prop({
    required: true,
    type: Number,
    min: 18,
  })
  age: number;

  @Prop({
    required: true,
    type: String,
  })
  email: string;

  @Prop({
    required: true,
    type: String,
  })
  address: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);