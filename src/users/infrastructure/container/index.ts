import "reflect-metadata";
import { container } from "tsyringe";
import { User } from "../typeorm/entities/users.entity";
import { UsersTypeormRepository } from "../typeorm/repositories/users.typeorm.repository";
import { CreateUserUseCase } from "@/users/application/usecases/create-user.usecase";
import { UpdateAvatarUseCase } from "@/users/application/usecases/update-avatar.usecase";
import { dataSource } from "@/common/infrastructure/typeorm";

container.registerInstance(
  "UsersDefaultTypeormRepository",
  dataSource.getRepository(User)
);

container.registerSingleton("UsersRepository", UsersTypeormRepository);

container.registerSingleton("CreateUsersUseCase", CreateUserUseCase.UseCase);

container.registerSingleton("UpdateAvatarUseCase", UpdateAvatarUseCase.UseCase);

console.log("Container carregado");
