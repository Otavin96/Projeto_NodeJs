import {
  CreateUserProps,
  UsersRepository,
} from "@/users/repositories/users.repositories";
import { inject, injectable } from "tsyringe";

import { Repository } from "typeorm";
import { User } from "../entities/users.entity";
import { UserModel } from "@/users/domain/models/user.model";
import {
  SearchInput,
  SearchOutput,
} from "@/common/domain/repositories/repository.interface";

@injectable()
export class UsersTypeormRepository implements UsersRepository {
  constructor(
    @inject("UsersDefaultTypeormRepository")
    private usersRepository: Repository<User>
  ) {}

  create(props: CreateUserProps): UserModel {
    return this.usersRepository.create(props);
  }

  async insert(model: UserModel): Promise<UserModel> {
    return this.usersRepository.save(model);
  }

  async findById(id: string): Promise<UserModel> {
    return this._get(id);
  }

  async update(model: UserModel): Promise<UserModel> {
    await this._get(model.id);

    await this.usersRepository.update(model.id, model);

    return model;
  }

  async delete(id: string): Promise<void> {
    await this._get(id);
    await this.usersRepository.delete(id);
  }

  async search(props: SearchInput): Promise<SearchOutput<UserModel>> {
    throw new Error("Method not implemented.");
  }

  protected async _get(id: string): Promise<UserModel> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error(`User not found using ID: ${id}`);
    }

    return user;
  }
}
