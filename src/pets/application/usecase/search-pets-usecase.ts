import { SearchInput } from "@/common/domain/repositories/repository.interface";
import {
  PaginationOutputDto,
  PaginationOutputMapper,
} from "../dtos/paginatin-output.dto";
import { PetModel } from "@/pets/domain/models/pet-model";
import { inject, injectable } from "tsyringe";
import { PetsRepository } from "@/pets/repositories/pets-repository";

export namespace SearchPetsUseCase {
  export type Input = SearchInput;

  export type Output = PaginationOutputDto<PetModel>;

  @injectable()
  export class UseCase {
    constructor(
      @inject("PetsRepository")
      private petsRepository: PetsRepository
    ) {}

    async execute(input: Input): Promise<Output> {
      const searchResult = await this.petsRepository.search(input);
      return PaginationOutputMapper.toOutput(searchResult.items, searchResult);
    }
  }
}
