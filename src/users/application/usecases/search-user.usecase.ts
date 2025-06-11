import { SearchInput } from "@/common/domain/repositories/repository.interface";
import { UserModel } from "@/users/domain/models/user.model";
import {
  PaginationOutputDto,
  PaginationOutputMapper,
} from "../dtos/pagination-output.dto";
import { inject, injectable } from "tsyringe";
import { UsersRepository } from "@/users/repositories/users.repositories";

export namespace SearchUserUseCase {
  export type Input = SearchInput;

  export type Output = PaginationOutputDto<UserModel>;

  @injectable()
  export class UseCase {
    constructor(
      @inject("UsersRepository")
      private usersRepository: UsersRepository
    ) {}

    async execute(input: Input): Promise<Output> {
      const searchResult = await this.usersRepository.search(input);
      return PaginationOutputMapper.toOutput(searchResult.items, searchResult);
    }
  }
}
