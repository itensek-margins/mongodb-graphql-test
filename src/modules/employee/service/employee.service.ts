import { Inject, Injectable, Logger } from "@nestjs/common";
import { AbstractEmployeeService } from "../abstract/employee.abstract.service";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { AbstractEmployeeRepository } from "../abstract/employee.abstract.repository";
import { IEmployee } from "../interface/employee.interface";
import { Employee } from "../schema/employee.schema";
import { FilterQuery, QueryOptions } from "mongoose";
import { TestProjectConflictException, TestProjectNotFoundException } from "src/common/exceptions/custom.exception";
import { EmployeeModel } from "../dto/employee.model";

@Injectable()
export class EmployeeService extends AbstractEmployeeService {
    constructor(
        @Inject(WINSTON_MODULE_NEST_PROVIDER) logger: Logger,
        employeeRepository: AbstractEmployeeRepository
    ) {
        super(logger, employeeRepository);
    }
    
    async create(employee: IEmployee): Promise<IEmployee> {
        const existingEmployees = await this._repository.findManyLean();
        const emailExists = existingEmployees.some((existingEmployee) => existingEmployee.email === employee.email);
        if (emailExists) {
            throw new TestProjectConflictException("Email already exists");
        }
        return await this._repository.createOne(employee);
    }

    async findMany(
        filter: FilterQuery<Employee> = {},
        projection: string | null = null,
        options?: QueryOptions
        ): Promise<IEmployee[]> {
            return await this._repository.findManyLean(filter, projection, options);
        }

    async findOne(id: string): Promise<IEmployee> {
        await this.checkId(id);
        return await this._repository.findOne({ _id: id });
    }
   
    async updateOne(id: string, input: IEmployee): Promise<IEmployee> {
        await this.checkId(id);
        return await this._repository.updateOneById(id, input);
    }

    async delete(id: string): Promise<IEmployee | void> {
        await this.checkId(id);
        return await this._repository.deleteOne({_id: id});
    }

    private async checkId(id: string): Promise<void> {
        const existingEmployees = await this._repository.findManyLean();
        const employeeExists = existingEmployees.some((employee) => employee._id === id);
        if (!employeeExists) {
            throw new TestProjectNotFoundException("Employee with the given id does not exist")
        }
    }
}