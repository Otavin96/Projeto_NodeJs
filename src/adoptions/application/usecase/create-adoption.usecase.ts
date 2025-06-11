import { Pet } from "@/pets/infrastructure/typeorm/entities/pet.entity";
import { AdoptionOutput } from "../dtos/adoption.dto";
import { User } from "@/users/infrastructure/typeorm/entities/users.entity";
import { inject, injectable } from "tsyringe";
import { AdoptionRepository } from "@/adoptions/repositories/adoption-repository";
import { BadRequestError } from "@/common/domain/errors/bad-request.error";
import { PetsRepository } from "@/pets/repositories/pets-repository";

export namespace CreateAdoptionUseCase {
  export type Input = {
    pet: Pet;
    adopter: User;
  };

  export type Output = AdoptionOutput;

  @injectable()
  export class UseCase {
    constructor(
      @inject("AdoptionsRepository")
      private adoptionRepository: AdoptionRepository,

      @inject("PetsRepository")
      private petsRepository: PetsRepository
    ) {}

    async execute(input: Input): Promise<Output> {
      const pet = await this.petsRepository.findById(input.pet.id);

      if (!input.pet || !input.adopter) {
        throw new BadRequestError("Pet and adopter must be provided");
      }

      const adoption = this.adoptionRepository.create(input);

      const createdAdoption = await this.adoptionRepository.insert(adoption);

      pet.available = false;
      await this.petsRepository.update(pet);

      return createdAdoption;
    }
  }
}
