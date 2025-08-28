// src/common/graphql/base-resolver.ts
import { Args, Int, Query } from '@nestjs/graphql';
import { IBaseResolver } from 'Interfaces/IResolvers/IBaseResolver';
import { IBaseService } from 'Interfaces/IServices/IBaseService';
import { GetUserDto } from 'src/User/DTOs/getUser.dto';
import type {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  ObjectLiteral,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseResolver<T extends ObjectLiteral>
  implements IBaseResolver<T>
{
  protected constructor(protected readonly service: IBaseService<T>) {}

  /** list with optional pagination */
  async findAll(
    @Args('take', { type: () => Int, nullable: true }) take?: number,
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
  ) {
    return await this.service.findAll({
      take: Number(take ?? 5),
      skip: Number(skip ?? 0),
    });
  }
  /** find by primary key (uuid or numeric) */
  async findById(id: string | number): Promise<T> {
    return await this.service.findById(id as any);
  }

  /** find one by arbitrary field */
  async findOneBy(field: string, value: any): Promise<T> {
    const opts: FindOneOptions<T> = {
      where: { [field]: value } as unknown as FindOptionsWhere<T>,
    };
    return await this.service.findOne(opts);
  }

  /** create */
  async create(input: DeepPartial<T>): Promise<T> {
    return await this.service.create(input, undefined);
  }

  /**
   * update by id
   * - maps id -> where clause and calls service.update
   * - returns boolean success. If your service returns more meaningful values,
   *   adjust this mapping as needed.
   */
  async update(
    options: FindOptionsWhere<T> | FindOptionsWhere<T>[],
    input: QueryDeepPartialEntity<T>,
  ): Promise<string> {
    return await this.service.update(options, input);
    // service.update returned Promise<string> in your IBaseService — interpret truthiness
  }

  /** delete by id */
  async delete(
    options: FindOptionsWhere<T> | FindOptionsWhere<T>[],
  ): Promise<string> {
    return await this.service.delete(options);
    // service.delete returned Promise<string> in your IBaseService — interpret truthiness
  }
}
