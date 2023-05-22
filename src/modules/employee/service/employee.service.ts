import { ConflictException, Inject, Injectable, Logger } from "@nestjs/common";
import { AbstractEmployeeService } from "../abstract/employee.abstract.service";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { AbstractEmployeeRepository } from "../abstract/employee.abstract.repository";
import { IEmployee } from "../interface/employee.interface";
import { Employee } from "../schema/employee.schema";
import { FilterQuery, QueryOptions } from "mongoose";
import { TestProjectConflictException } from "src/common/exceptions/custom.exception";

@Injectable()
export class EmployeeService extends AbstractEmployeeService {
    constructor(
        @Inject(WINSTON_MODULE_NEST_PROVIDER) logger: Logger,
        employeeRepository: AbstractEmployeeRepository
    ) {
        super(logger, employeeRepository);
    }

    async create(employee: IEmployee): Promise<IEmployee> {
        const existingEmployees = await this._repository.findMany() as unknown as Employee[];
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
            return await this._repository.findMany(filter, projection, options) as unknown as Employee[];
        }

    async findOne(id: string): Promise<IEmployee> {
        return await this._repository.findOne({ _id: id });
    }
   
    async updateOne(id: string, input: Partial<IEmployee>): Promise<IEmployee> {
        return await this._repository.updateOneById(id, input);
    }
    async delete(id: string): Promise<IEmployee | void> {
        return await this._repository.deleteOne({_id: id});
    }
}