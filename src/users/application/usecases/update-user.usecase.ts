import { inject, injectable } from "tsyringe";
import { UserOutput } from "../dtos/user.dto";
import { UsersRepository } from "@/users/repositories/users.repositories";
import { BcryptHashProvider } from "@/common/infrastructure/providers/hash-provider/bcrypt-hash-provider";
import { Address } from "@/users/infrastructure/typeorm/entities/address.entity";

export namespace UpdateUserUseCase {
  export type Input = {
    id: string;
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
    address?: Address;
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
      const user = await this.usersRepository.findById(input.id);

      if (input.name) {
        user.name = input.name;
      }

      if (input.email) {
        user.email = input.email;
      }

      if (input.password) {
        user.password = await this.bcryptProvider.generateHash(input.password);
      }

      if (input.phone) {
        user.phone = input.phone;
      }

      if (input.address.street) {
        user.address.street = input.address.street;
      }

      if (input.address.city) {
        user.address.city = input.address.city;
      }
      if (input.address.state) {
        user.address.state = input.address.state;
      }
      if (input.address.numberHouse) {
        user.address.numberHouse = input.address.numberHouse;
      }

      const UpdateOutput: UserOutput = await this.usersRepository.update(user);

      return UpdateOutput;
    }
  }
}
