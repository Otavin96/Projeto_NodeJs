import { NotFoundError } from "@/common/domain/errors/not-found-error";
import { UsersRepository } from "@/users/repositories/users.repositories";
import { inject, injectable } from "tsyringe";

export namespace DeleteUserUseCase {
  export type Input = {
    id: string;
  };

  export type Output = void;

  @injectable()
  export class UseCase {
    constructor(
      @inject("UsersRepository")
      private usersRepository: UsersRepository
    ) {}

    async execute(input: Input): Promise<Output> {
      if (!input.id) {
        throw new NotFoundError(`Not user using this ID: ${input.id}`);
      }

      return this.usersRepository.delete(input.id);
    }
  }
}
