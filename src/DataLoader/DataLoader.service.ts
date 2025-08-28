import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { IBaseService } from 'Interfaces/IServices/IBaseService';
import { IDataLoader } from 'Interfaces/IServices/IDataLoaderService';
import { ObjectLiteral } from 'typeorm';

@Injectable()
export class DataLoaderService implements IDataLoader {
  createLoader<T extends ObjectLiteral, K extends keyof T>(
    service: IBaseService<T>,
    field: K,
  ): DataLoader<T[K], T | null> {
    return new DataLoader(async (keys: readonly T[K][]) => {
      const options = keys.map((key) => ({ [field]: key }) as any);
      const entities = await service.findByBatching(options);

      return keys.map(
        (key) => entities.find((entity) => entity[field] === key) || null,
      );
    });
  }
}
