import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Employee } from "../schema/employee.schema";
import { AbstractEmployeeRepository } from "../abstract/employee.abstract.repository";

@Injectable()
export class EmployeeRepositoryService extends AbstractEmployeeRepository {
  constructor(
    @InjectModel("Employee")
    employeeRepository: Model<Employee>
  ) {
    super(employeeRepository);
  }
}
