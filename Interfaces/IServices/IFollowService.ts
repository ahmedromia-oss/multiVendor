import { ClientVendorFollow } from "src/ClientVendorFollow/Follow.model";
import { IBaseService } from "./IBaseService";

export interface IFollowService extends IBaseService<ClientVendorFollow>{
    followUnFollow(vendorId:string , clientId:string):Promise<String>
}