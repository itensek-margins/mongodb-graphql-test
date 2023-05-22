/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Interface for CRUD services.
 */
export interface BaseCrudInterface<T> {
  /**
   * Creating resource
   * @param args - Arguments
   * @returns Resource
   */
  create(...args: any[]): Promise<T>;

  /**
   * Finds resource
   * @param args - Arguments
   * @returns Resource
   */
  findOne(...args: any[]): Promise<T>;

  /**
   * Find resourcs
   * @param args - Arguments
   * @returns Multiple resources
   */
  findMany(...args: any[]): Promise<T[]>;

  /**
   * Update resource
   * @param args - Arguments
   * @returns Resource
   */
  updateOne(...args: any[]): Promise<T>;

  /**
   * Delete resource
   * @param args - Arguments
   * @returns Resource
   */
  delete(...args: any[]): Promise<T | void>;
}
