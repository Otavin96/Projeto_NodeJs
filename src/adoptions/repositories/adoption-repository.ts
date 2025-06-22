import { RepositoryInterface } from "@/common/domain/repositories/repository.interface";
import { Pet } from "@/pets/infrastructure/typeorm/entities/pet.entity";
import { AdoptionModel } from "../domain/adoption-model";
import { UserModel } from "@/users/domain/models/user.model";

export interface CreateAdotionProps {
  pet: Pet;
  adopter: UserModel;
}

export interface AdoptionRepository
  extends RepositoryInterface<AdoptionModel, CreateAdotionProps> {}
