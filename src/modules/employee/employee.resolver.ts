import { AbstractEmployeeResolver } from "./abstract/employee.abstract.resolver";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { EmployeeInput } from "./dto/employee.dto";
import { AbstractEmployeeService } from "./abstract/employee.abstract.service";
import { EmployeeModel } from "./dto/employee.model";

@Resolver(() => EmployeeInput)
export class EmployeeResolver extends AbstractEmployeeResolver {
  constructor(employeeService: AbstractEmployeeService) {
    super(employeeService);
  }

  @Mutation(() => EmployeeModel)
  createEmployee(@Args('employeeInput') employeeInput: EmployeeInput): Promise<EmployeeModel> {
    return this._service.create(employeeInput);
  }
  @Query(() => [EmployeeModel])
  async getEmployees(): Promise<EmployeeModel[]> {
    return this._service.findMany();
  }

  @Query(() => EmployeeModel)
  async getEmployee(@Args('_id') id: string): Promise<EmployeeModel> {
    return this._service.findOne(id);
  }  
  
  @Mutation(() => EmployeeModel)
  async updateEmployee(@Args('id') id: string, @Args('employeeInput') employeeInput: EmployeeInput): Promise<EmployeeModel> {
    return this._service.updateOne(id, employeeInput);
  }

  @Mutation(() => EmployeeModel)
  async deleteEmployee(@Args('id') id: string): Promise<EmployeeModel | void> {
    return this._service.delete(id);
  }
}
