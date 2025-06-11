import {
  CreateUserProps,
  UsersRepository,
} from "@/users/repositories/users.repositories";
import { inject, injectable } from "tsyringe";

import { ILike, Repository } from "typeorm";
import { User } from "../entities/users.entity";
import { UserModel } from "@/users/domain/models/user.model";
import {
  SearchInput,
  SearchOutput,
} from "@/common/domain/repositories/repository.interface";
import { ConflictError } from "@/common/domain/errors/conflict-error";
import { NotFoundError } from "@/common/domain/errors/not-found-error";

@injectable()
export class UsersTypeormRepository implements UsersRepository {
  constructor(
    @inject("UsersDefaultTypeormRepository")
    private usersRepository: Repository<User>
  ) {}

  sortableFields: string[] = ["created_at"];

  async conflictEmail(email: string): Promise<void> {
    const user = await this.usersRepository.findOneBy({ email });

    if (user) {
      throw new ConflictError(
        `There is already a user with that email: ${email}`
      );
    }
  }

  async conflictName(name: string): Promise<void> {
    const user = await this.usersRepository.findOneBy({ name });

    if (user) {
      throw new ConflictError(
        `There is already a user with that name: ${name}`
      );
    }
  }

  async findByEmail(email: string): Promise<UserModel> {
    const user = await this.usersRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundError(`User not found using email: ${email}`);
    }

    return user;
  }

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
    const validSort = this.sortableFields.includes(props.sort) || false;
    const dirOps = ["asc", "desc"];
    const validSortDir =
      (props.sort_dir && dirOps.includes(props.sort_dir.toLowerCase())) ||
      false;
    const orderByField = validSort ? props.sort : "created_at";
    const orderByDir = validSortDir ? props.sort_dir : "desc";
    const [users, total] = await this.usersRepository.findAndCount({
      ...(props.filter && {
        where: {
          name: ILike(props.filter),
        },
      }),
      order: {
        [orderByField]: orderByDir,
      },
      skip: (props.page - 1) * props.per_page,
      take: props.per_page,
    });
    return {
      items: users,
      per_page: props.per_page,
      total,
      current_page: props.page,
      sort: props.sort,
      sort_dir: props.sort_dir,
      filter: props.filter,
    };
  }

  protected async _get(id: string): Promise<UserModel> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error(`User not found using ID: ${id}`);
    }

    return user;
  }
}
