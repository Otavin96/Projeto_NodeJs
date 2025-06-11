import { Address } from "@/users/infrastructure/typeorm/entities/address.entity";

export interface UserModel {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: Address;
  avatar?: string;
  created_at: Date;
  updated_at: Date;
}
