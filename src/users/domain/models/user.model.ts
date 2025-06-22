import { Pet } from "@/pets/infrastructure/typeorm/entities/pet.entity";
import { Address } from "@/users/infrastructure/typeorm/entities/address.entity";
import { User } from "@/users/infrastructure/typeorm/entities/users.entity";

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
