// src/common/graphql/i-base-resolver.ts
import type { DeepPartial, FindOptionsWhere } from 'typeorm';
import type { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity.js';

export interface IBaseResolver<T> {
  /** Query: list with optional pagination */
  findAll(take?: number, skip?: number): Promise<T[]>;

  /** Query: find by primary key (works for uuid or numeric PK) */
  findById(id: string | number): Promise<T>;

  /** Query: find one by arbitrary field/value */
  findOneBy(field: string, value: any): Promise<T>;

  /** Mutation: create */
  create(input: DeepPartial<T>): Promise<T>;

  /** Mutation: update by id (returns true on success) */
  update(options: FindOptionsWhere<T>|FindOptionsWhere<T>[], input: QueryDeepPartialEntity<T>): Promise<string>;

  /** Mutation: delete by id (returns true on success) */
  delete(options: FindOptionsWhere<T>|FindOptionsWhere<T>[]): Promise<string>;
}
