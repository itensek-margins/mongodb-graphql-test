import { Inject, Injectable, Logger } from "@nestjs/common";
import { AbstractEmployeeService } from "../abstract/employee.abstract.service";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { AbstractEmployeeRepository } from "../abstract/employee.abstract.repository";
import { IEmployee } from "../interface/employee.interface";
import { Employee } from "../schema/employee.schema";
import { FilterQuery, QueryOptions } from "mongoose";

@Injectable()
export class EmployeeService extends AbstractEmployeeService {
    async findMany(
    filter: FilterQuery<Employee> = {},
    projection: string | null = null,
    options?: QueryOptions
    ): Promise<IEmployee[]> {
        return await this._repository.findMany(filter, projection, options) as unknown as Employee[];
    }
    
    constructor(
        @Inject(WINSTON_MODULE_NEST_PROVIDER) logger: Logger,
        employeeRepository: AbstractEmployeeRepository
    ) {
        super(logger, employeeRepository);
    }

    async create(employee: IEmployee): Promise<IEmployee> {
        return await this._repository.createOne(employee);
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