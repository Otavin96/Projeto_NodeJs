import { Pet } from "@/pets/infrastructure/typeorm/entities/pet.entity";
import { User } from "@/users/infrastructure/typeorm/entities/users.entity";

export type AdoptionOutput = {
  id: string;
  pet: Pet;
  adopter: User;
  created_at: Date;
  updated_at: Date;
};
