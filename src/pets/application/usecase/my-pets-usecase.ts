import { inject, injectable } from "tsyringe";
import { PetsOutput } from "../dtos/pets-output.dto";
import { PetsRepository } from "@/pets/repositories/pets-repository";
import { UsersRepository } from "@/users/repositories/users.repositories";
import { NotFoundError } from "@/common/domain/errors/not-found-error";

export namespace MyPetsUseCase {
  export type Input = {
    id: string;
  };

  export type Output = PetsOutput[];

  @injectable()
  export class UseCase {
    constructor(
      @inject("PetsRepository")
      private petsRepository: PetsRepository,
      @inject("UsersRepository")
      private usersRepository: UsersRepository
    ) {}

    async execute(input: Input): Promise<Output> {
      if (!input.id) {
        throw new NotFoundError("User ID não fornecido");
      }

      await this.usersRepository.findById(input.id);

      const pets = await this.petsRepository.myPets(input.id);

      return pets;
    }
  }
}
