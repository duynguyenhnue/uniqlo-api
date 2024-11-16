import { Address, userPhone } from "../request/users.request";

export class UserResponse {
  fullName: string;
  email: string;
  birthdate: string;
  address: Address;
  phone: userPhone;
}
