/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Abstract service for CRUD operations.
 */

import { Injectable, Logger } from '@nestjs/common';

import { AbstractRepository } from './repository.abstract';
import { BaseCrudInterface } from '../interfaces/base';

@Injectable()
export abstract class AbstractCrudService<T, U>
  implements BaseCrudInterface<T>
{
  protected constructor(
    protected readonly _logger: Logger,
    protected readonly _repository: AbstractRepository<U>
  ) {}

  abstract create(...args: any[]): Promise<T>;
  abstract findOne(...args: any[]): Promise<T>;
  abstract findMany(...args: any[]): Promise<T[]>;
  abstract updateOne(...args: any[]): Promise<T>;
  abstract delete(...args: any[]): Promise<T | void>;
}
