import { User } from "src/User/user.model.js";
import { IBaseService } from "./IBaseService";
import { Vendor } from "src/Vendor/vendor.model";

export interface IVendorService extends IBaseService<Vendor> {
  
}