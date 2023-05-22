import { AbstractEmployeeResolver } from "./abstract/employee.abstract.resolver";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { EmployeeInput } from "./dto/employee.dto";
import { AbstractEmployeeService } from "./abstract/employee.abstract.service";
import { EmployeeModel } from "./dto/employee.model";
import { EmployeeUpdateInput } from "./dto/employee-update.dto";

@Resolver(() => EmployeeInput)
export class EmployeeResolver extends AbstractEmployeeResolver {
  constructor(employeeService: AbstractEmployeeService) {
    super(employeeService);
  }

  @Mutation(() => EmployeeModel, {name: "createEmployee"})
  createEmployee(@Args('employeeInput') employeeInput: EmployeeInput): Promise<EmployeeModel> {
    return this._service.create(employeeInput);
  }
  @Query(() => [EmployeeModel], {name: "getEmployees"})
  async getEmployees(): Promise<EmployeeModel[]> {
    return this._service.findMany();
  }

  @Query(() => EmployeeModel, {name: "getEmployee"})
  async getEmployee(@Args('id') id: string): Promise<EmployeeModel> {
    return this._service.findOne(id);
  }  
  
  @Mutation(() => EmployeeModel, {name: "updateEmployee"})
  async updateEmployee(@Args('id') id: string, @Args('employeeInput') employeeInput: EmployeeUpdateInput): Promise<EmployeeModel> {
    return this._service.updateOne(id, employeeInput);
  }

  @Mutation(() => EmployeeModel, {name: "deleteEmployee"})
  async deleteEmployee(@Args('id') id: string): Promise<EmployeeModel | void> {
    return this._service.delete(id);
  }
}
