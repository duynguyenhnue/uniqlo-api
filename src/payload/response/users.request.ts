import { Address } from "../request/users.request";

export class UserResponse {
  fullName: string;
  email: string;
  address: Address;
  phone: string;
}
