import { Logger } from "@nestjs/common/services/logger.service";
import { IEmployee } from "../interface/employee.interface";
import { Employee } from "../schema/employee.schema";
import { AbstractCrudService } from "src/common/abstract";
import { AbstractEmployeeRepository } from "./employee.abstract.repository";

export abstract class AbstractEmployeeService extends AbstractCrudService<IEmployee, Employee> {
    protected constructor(
        protected readonly _logger: Logger,
        protected readonly _repository: AbstractEmployeeRepository
    ) {
        super(_logger, _repository);
    }
}