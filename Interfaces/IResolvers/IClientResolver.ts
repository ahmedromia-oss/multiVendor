import { User } from 'src/User/user.model';
import { IBaseResolver } from './IBaseResolver';
import { Client } from 'src/Client/client.model';
import { UserToken } from 'shared/models/userToken.model';

export interface IClientResolver extends IBaseResolver<Client> {
  followUnFollow(vendorId: string, user: UserToken): Promise<String>;
}
