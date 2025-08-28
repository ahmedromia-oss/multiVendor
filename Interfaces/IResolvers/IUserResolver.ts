import { User } from 'src/User/user.model';
import { IBaseResolver } from './IBaseResolver';

export interface IUserResolver extends IBaseResolver<User> {
  approveUser(id: string): Promise<String>;
}
