import DataLoader from 'dataloader';
import { ObjectLiteral } from 'typeorm';
import { IBaseService } from './IBaseService';

export interface IDataLoader {
createLoader<T extends ObjectLiteral, K extends keyof T>(
    service: IBaseService<T>,
    field: K
  ): DataLoader<T[K], T | null> 
}
