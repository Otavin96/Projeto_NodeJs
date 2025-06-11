import "reflect-metadata";
import { container } from "tsyringe";
import { User } from "../typeorm/entities/users.entity";
import { UsersTypeormRepository } from "../typeorm/repositories/users.typeorm.repository";
import { CreateUserUseCase } from "@/users/application/usecases/create-user.usecase";
import { UpdateAvatarUseCase } from "@/users/application/usecases/update-avatar.usecase";
import { dataSource } from "@/common/infrastructure/typeorm";
import { DeleteUserUseCase } from "@/users/application/usecases/delete-user.usecase";
import { SearchUserUseCase } from "@/users/application/usecases/search-user.usecase";
import { UpdateUserUseCase } from "@/users/application/usecases/update-user.usecase";
import { AuthenticateUserUseCase } from "@/users/application/usecases/authenticate-user.usecase";

container.registerInstance(
  "UsersDefaultTypeormRepository",
  dataSource.getRepository(User)
);

container.registerSingleton("UsersRepository", UsersTypeormRepository);

container.registerSingleton("CreateUsersUseCase", CreateUserUseCase.UseCase);

container.registerSingleton("DeleteUsersUseCase", DeleteUserUseCase.UseCase);

container.registerSingleton("SearchUsersUseCase", SearchUserUseCase.UseCase);

container.registerSingleton("UpdateUsersUseCase", UpdateUserUseCase.UseCase);

container.registerSingleton("UpdateAvatarUseCase", UpdateAvatarUseCase.UseCase);

container.registerSingleton(
  "AuthenticateUserUseCase",
  AuthenticateUserUseCase.UseCase
);

console.log("Container carregado");
