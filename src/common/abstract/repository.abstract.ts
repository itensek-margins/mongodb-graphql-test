/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Abstract repository class.
 */
import { Injectable } from '@nestjs/common';
import {
  AnyKeys,
  AnyObject,
  Document,
  FilterQuery,
  HydratedDocument,
  Model,
  Query,
  QueryOptions,
  Types,
  UpdateQuery,
  UpdateWriteOpResult,
} from 'mongoose';

import { BaseRepository } from '../interfaces/base/repository.base.interface';

@Injectable()
export abstract class AbstractRepository<T> implements BaseRepository<T> {
  constructor(protected readonly entity: Model<T>) {}

  public async createOne(
    data: AnyObject | AnyKeys<Document<T>>,
  ): Promise<HydratedDocument<T>> {
    return await this.entity.create(data);
  }

  public async findMany(
    filter: FilterQuery<T> = {},
    projection: string | null = null,
    options?: QueryOptions,
  ): Promise<Document<T>[]> {
    return await this.entity.find(filter, projection, options);
  }

  public async findManyLean(
    filter: FilterQuery<T> = {},
    projection: string | null = null,
    options?: QueryOptions,
  ): Promise<T[]> {
    return await this.entity.find(filter, projection, options).lean();
  }

  public async findOne(
    filter: FilterQuery<T> = {},
    projection?: string,
    options?: QueryOptions,
  ): Promise<(T & Document<T>) | null | undefined> {
    return await this.entity.findOne(filter, projection, options);
  }

  public async findOneLean(
    filter: FilterQuery<T> = {},
    projection?: string,
    options?: QueryOptions,
  ): Promise<T> {
    return await this.entity.findOne(filter, projection, options).lean();
  }

  public async updateOneById(
    id: string,
    update: UpdateQuery<T>,
  ): Promise<T | null> {
    return await this.entity.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      update,
      { new: true },
    );
  }

  public async updateMany(
    query: FilterQuery<T>,
    data: UpdateQuery<T>,
  ): Promise<Query<UpdateWriteOpResult, T & Document>> {
    return await this.entity.updateMany(query, data);
  }

  async deleteOne(query: FilterQuery<T>): Promise<T | void> {
    return await this.entity.findOneAndDelete(query).lean();
  }

  async count(query: FilterQuery<T>): Promise<number> {
    return await this.entity.count(query);
  }
}
