/* eslint-disable @typescript-eslint/no-explicit-any */

import {
    AnyKeys,
    Document,
    FilterQuery,
    ProjectionType,
    Query,
    UpdateQuery
  } from 'mongoose';
  
  export type BaseDocument<T> = T & Document;
  
  /**
   * Base repository interface.
   */
  export interface BaseRepository<T> {
    findOne(
      filter: FilterQuery<T>,
      projection?: ProjectionType<T & Document> | null
    ): Promise<Document<T> | undefined | null>;
  
    findOneLean(filter: FilterQuery<T>, projection?: string | null): Promise<T>;
  
    findMany(
      filter: FilterQuery<T>,
      projection?: string | null
    ): Promise<Document<T>[]>;
  
    findManyLean(
      filter: FilterQuery<T>,
      projection?: string | null
    ): Promise<T[]>;
  
    updateOneById(id: string, update: UpdateQuery<T>): Promise<any>;
  
    updateMany(
      filter: FilterQuery<T>,
      query: UpdateQuery<T>
    ): Promise<Query<any, T & Document> | void>;
  
    createOne(data: Record<any, any> | AnyKeys<T>): Promise<T>;
  
    deleteOne(query: FilterQuery<T>): Promise<T | void>;
  }
  