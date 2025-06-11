import { inject, injectable } from "tsyringe";
import { InvalidCredentialsError } from "@/common/domain/errors/invalid-credentials-error";
import { UserOutput } from "../dtos/user.dto";
import { UsersRepository } from "@/users/repositories/users.repositories";
import { BcryptHashProvider } from "@/common/infrastructure/providers/hash-provider/bcrypt-hash-provider";

export namespace AuthenticateUserUseCase {
  export type Input = {
    email: string;
    password: string;
  };

  export type Output = UserOutput;

  @injectable()
  export class UseCase {
    constructor(
      @inject("UsersRepository")
      private usersRepository: UsersRepository,
      @inject("BcryptProvider")
      private bcryptjsHashProvider: BcryptHashProvider
    ) {}

    async execute(input: Input): Promise<Output> {
      if (!input.email || !input.password) {
        throw new InvalidCredentialsError("Invalid credentials");
      }

      const user = await this.usersRepository.findByEmail(input.email);

      const passwordMatch = await this.bcryptjsHashProvider.compareHash(
        input.password,
        user.password
      );

      if (!passwordMatch) {
        throw new InvalidCredentialsError("Invalid credentials");
      }

      return user;
    }
  }
}
