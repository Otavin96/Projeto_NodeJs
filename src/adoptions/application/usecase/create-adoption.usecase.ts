import { AdoptionOutput } from "../dtos/adoption.dto";
import { inject, injectable } from "tsyringe";
import { AdoptionRepository } from "@/adoptions/repositories/adoption-repository";
import { BadRequestError } from "@/common/domain/errors/bad-request.error";
import { PetsRepository } from "@/pets/repositories/pets-repository";
import { UsersRepository } from "@/users/repositories/users.repositories";

export namespace CreateAdoptionUseCase {
  export type Input = {
    pet: string;
    adopter: string;
  };

  export type Output = AdoptionOutput;

  @injectable()
  export class UseCase {
    constructor(
      @inject("AdoptionsRepository")
      private adoptionRepository: AdoptionRepository,

      @inject("PetsRepository")
      private petsRepository: PetsRepository,

      @inject("UsersRepository")
      private usersRepository: UsersRepository
    ) {}

    async execute(input: Input): Promise<Output> {
      const pet = await this.petsRepository.findById(input.pet);
      const adopter = await this.usersRepository.findById(input.adopter);

      if (!pet || !adopter) {
        throw new BadRequestError("Pet and adopter must be provided");
      }

      if (!pet.available) {
        throw new BadRequestError("Pet is not available for adoption");
      }

      const adoption = this.adoptionRepository.create({
        pet,
        adopter,
      });

      const createdAdoption = await this.adoptionRepository.insert(adoption);

      pet.available = false;
      await this.petsRepository.update(pet);

      return createdAdoption;
    }
  }
}
