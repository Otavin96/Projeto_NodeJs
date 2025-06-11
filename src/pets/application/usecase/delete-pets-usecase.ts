import { PetsRepository } from "@/pets/repositories/pets-repository";
import { inject, injectable } from "tsyringe";

export namespace DeletePetsUseCase {
  export type Input = {
    id: string;
  };

  export type Output = void;

  @injectable()
  export class UseCase {
    constructor(
      @inject("PetsRepository")
      private petsRepository: PetsRepository
    ) {}

    async execute(input: Input): Promise<Output> {
      await this.petsRepository.delete(input.id);
    }
  }
}
