import { inject, injectable } from "tsyringe";
import { UserOutput } from "../dtos/user.dto";
import { UsersRepository } from "@/users/repositories/users.repositories";
import { BcryptHashProvider } from "@/common/infrastructure/providers/hash-provider/bcrypt-hash-provider";

export namespace CreateUserUseCase {
  export type Input = {
    name: string;
    email: string;
    password: string;
    phone: string;
    avatar?: string;
  };

  export type Output = UserOutput;

  @injectable()
  export class UseCase {
    constructor(
      @inject("UsersRepository")
      private usersRepository: UsersRepository,

      @inject("BcryptProvider")
      private bcryptProvider: BcryptHashProvider
    ) {}

    async execute(input: Input): Promise<Output> {
      if (!input.name || !input.email || !input.password || !input.phone) {
        throw new Error("Input data not provided or invalid");
      }

      const user = this.usersRepository.create(input);

      user.password = await this.bcryptProvider.generateHash(input.password);

      const createdUser: UserOutput = await this.usersRepository.insert(user);
      return createdUser;
    }
  }
}
