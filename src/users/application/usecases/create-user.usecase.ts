import { inject, injectable } from "tsyringe";
import { UserOutput } from "../dtos/user.dto";
import { UsersRepository } from "@/users/repositories/users.repositories";
import { BcryptHashProvider } from "@/common/infrastructure/providers/hash-provider/bcrypt-hash-provider";
import { Address } from "@/users/infrastructure/typeorm/entities/address.entity";

export namespace CreateUserUseCase {
  export type Input = {
    name: string;
    email: string;
    password: string;
    phone: string;
    avatar?: string;
    address: Address;
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
      if (
        !input.name ||
        !input.email ||
        !input.password ||
        !input.phone ||
        !input.address.street ||
        !input.address.state ||
        !input.address.city ||
        !input.address.numberHouse
      ) {
        throw new Error("Input data not provided or invalid");
      }

      await this.usersRepository.conflictEmail(input.email);

      await this.usersRepository.conflictName(input.name);

      const user = this.usersRepository.create(input);

      user.password = await this.bcryptProvider.generateHash(input.password);

      const createdUser: UserOutput = await this.usersRepository.insert(user);

      return createdUser;
    }
  }
}
