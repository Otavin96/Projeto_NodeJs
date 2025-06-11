import { container } from "tsyringe";
import { dataSource } from "@/common/infrastructure/typeorm";
import { Pet } from "../typeorm/entities/pet.entity";
import { PetsTypeormRepository } from "../typeorm/repositories/pet-typeorm.repository";
import { CreatePetsUseCase } from "@/pets/application/usecase/create-pets-usecase";
import { DeletePetsUseCase } from "@/pets/application/usecase/delete-pets-usecase";
import { SearchPetsUseCase } from "@/pets/application/usecase/search-pets-usecase";
import { UpdatePetsUseCase } from "@/pets/application/usecase/update-pets-usecase";

container.registerSingleton("PetsRepository", PetsTypeormRepository);

container.registerInstance(
  "PetsDefaultTypeormRepository",
  dataSource.getRepository(Pet)
);

container.registerSingleton("CreatePetsUseCase", CreatePetsUseCase.UseCase);

container.registerSingleton("DeletePetsUseCase", DeletePetsUseCase.UseCase);

container.registerSingleton("UpdatePetsUseCase", UpdatePetsUseCase.UseCase);

container.registerSingleton("SearchPetsUseCase", SearchPetsUseCase.UseCase);
