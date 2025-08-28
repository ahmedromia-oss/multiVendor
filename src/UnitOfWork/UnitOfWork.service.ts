// src/shared/unit-of-work/unit-of-work.service.ts
import { Injectable } from '@nestjs/common';
import { IUnitOfWork } from 'Interfaces/IServices/IUnitOfWrokService';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class UnitOfWork implements IUnitOfWork {
  constructor(private readonly dataSource: DataSource) {}

  async execute<T>(work: (manager: EntityManager) => Promise<T>): Promise<T> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await work(queryRunner.manager);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}