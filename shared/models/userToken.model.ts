import { UserType } from "shared/constants";

export class UserToken {
  sub: string;
  type: UserType;
  Approved: boolean;
}