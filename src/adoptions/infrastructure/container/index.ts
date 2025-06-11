import { dataSource } from "@/common/infrastructure/typeorm";
import { container } from "tsyringe";
import { Adoption } from "../typeorm/entities/adoption.entity";
import { AdoptionTypeOrmRepository } from "../typeorm/repositories/adoption-typeorm-repository";
import { CreateAdoptionUseCase } from "@/adoptions/application/usecase/create-adoption.usecase";

container.registerSingleton("AdoptionsRepository", AdoptionTypeOrmRepository);

container.registerInstance(
  "AdoptionsDefaultTypeOrmRepository",
  dataSource.getRepository(Adoption)
);

container.registerSingleton(
  "CreateAdoptionsUseCase",
  CreateAdoptionUseCase.UseCase
);
