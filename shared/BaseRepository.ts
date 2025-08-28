import { BadRequestException, NotFoundException } from '@nestjs/common';

import {
  Repository,
  DeepPartial,
  FindOneOptions,
  FindManyOptions,
  FindOptionsWhere,
  EntityManager,
  ObjectLiteral,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Code, ValidationErrors, valuesString } from './constants';
import { IBaseRepository } from 'Interfaces/IRepositories/IBaseRepository';
export class BaseRepository<T extends ObjectLiteral>
  implements IBaseRepository<T>
{
  constructor(protected readonly repository: Repository<T>) {}

  private getRepo(manager?: EntityManager): Repository<T> {
    return manager
      ? manager.getRepository<T>(this.repository.target as any)
      : this.repository;
  }
  public async checkIFExists(options: FindManyOptions<T>) {
    return await this.getRepo().exists(options);
  }
  async create(data: DeepPartial<T>, manager?: EntityManager): Promise<T> {
    const entity = this.getRepo(manager).create(data);
    return await this.getRepo(manager).save(entity);
  }

  async findAll(
    options?: FindManyOptions<T>,
    manager?: EntityManager,
  ): Promise<T[]> {
    return await this.getRepo(manager).find({ ...options });
  }

  async findById(
    id: number | string,
    options?: FindOneOptions<T>,
    manager?: EntityManager,
  ): Promise<T> {
    try {
      return await this.getRepo(manager).findOneOrFail({
        where: { id } as any,
        ...options,
      });
    } catch {
      throw new NotFoundException();
    }
  }
  async findOne(
    options: FindOneOptions<T>,
    manager?: EntityManager,
  ): Promise<T> {
    try {
      return await this.getRepo(manager).findOneOrFail(options);
    } catch {
      throw new NotFoundException();
    }
  }

  async update(
    Options: FindOptionsWhere<T> | FindOptionsWhere<T>[],
    data: QueryDeepPartialEntity<T>,
    manager?: EntityManager,
  ): Promise<string> {
    try {
      const result = await this.getRepo(manager).update(Options, data);

      // Check if any rows were actually affected
      if (result.affected === 0) {
        throw new NotFoundException('Entity not found or no changes made');
      }

      return valuesString.UPDATED;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      // Log the actual error for debugging
      console.error('Update error:', error);
      throw new BadRequestException('Failed to update entity');
    }
  }

  async delete(
    options: FindOptionsWhere<T>[] | FindOptionsWhere<T>,
    manager?: EntityManager,
  ): Promise<string> {
    try {
      const result = await this.getRepo(manager).delete(options);

      if (result.affected === 0) {
        throw new NotFoundException('Entity not found');
      }

      return Code.DELETED;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      console.error('Delete error:', error);
      throw new BadRequestException('Failed to delete entity');
    }
  }
  async findByBatching(
    options: FindOptionsWhere<T>[] | FindOptionsWhere<T>,
    manager?: EntityManager,
  ): Promise<T[]> {
    return await this.getRepo(manager).findBy(options);
  }
}
