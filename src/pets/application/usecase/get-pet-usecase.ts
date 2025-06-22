import { PetsRepository } from "@/pets/repositories/pets-repository";
import { inject, injectable } from "tsyringe";
import { PetsOutput } from "../dtos/pets-output.dto";
import { BadRequestError } from "@/common/domain/errors/bad-request.error";

export namespace GetPetUseCase {
  export type Input = {
    id: string;
  };

  export type Output = PetsOutput;

  @injectable()
  export class UseCase {
    constructor(
      @inject("PetsRepository")
      private petsRepository: PetsRepository
    ) {}

    async execute(input: Input): Promise<Output> {
      return await this.petsRepository.findById(input.id);
    }
  }
}
