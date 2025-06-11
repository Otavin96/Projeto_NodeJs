import { RepositoryInterface } from "@/common/domain/repositories/repository.interface";
import { PetModel } from "../domain/models/pet-model";
import { User } from "@/users/infrastructure/typeorm/entities/users.entity";

export type CreatePetProps = {
  name: string;
  age: number;
  description: string;
  weight: number;
  color: string;
  images: string[];
  available?: boolean;
  owner: User;
};

export interface PetsRepository
  extends RepositoryInterface<PetModel, CreatePetProps> {}
