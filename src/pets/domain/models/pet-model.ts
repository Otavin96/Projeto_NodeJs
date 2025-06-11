import { User } from "@/users/infrastructure/typeorm/entities/users.entity";

export interface PetModel {
  id: string;
  name: string;
  age: number;
  description: string;
  weight: number;
  color: string;
  images: string[];
  available: boolean;
  owner: User;
  created_at: Date;
  updated_at: Date;
}
