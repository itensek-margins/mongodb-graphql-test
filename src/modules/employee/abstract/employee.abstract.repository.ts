import { AbstractRepository } from "src/common/abstract";
import { Employee } from "../schema/employee.schema";

export abstract class AbstractEmployeeRepository extends AbstractRepository<Employee> {}
