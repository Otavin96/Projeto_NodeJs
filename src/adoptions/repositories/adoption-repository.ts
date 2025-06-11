import { RepositoryInterface } from "@/common/domain/repositories/repository.interface";
import { Pet } from "@/pets/infrastructure/typeorm/entities/pet.entity";
import { User } from "@/users/infrastructure/typeorm/entities/users.entity";
import { AdoptionModel } from "../domain/adoption-model";

export interface CreateAdotionProps {
  pet: Pet;
  adopter: User;
}

export interface AdoptionRepository
  extends RepositoryInterface<AdoptionModel, CreateAdotionProps> {}
