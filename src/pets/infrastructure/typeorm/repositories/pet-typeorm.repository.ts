import {
  SearchInput,
  SearchOutput,
} from "@/common/domain/repositories/repository.interface";
import { PetModel } from "@/pets/domain/models/pet-model";
import {
  CreatePetProps,
  PetsRepository,
} from "@/pets/repositories/pets-repository";
import { inject, injectable } from "tsyringe";
import { ILike, Repository } from "typeorm";
import { Pet } from "../entities/pet.entity";
import { NotFoundError } from "@/common/domain/errors/not-found-error";

@injectable()
export class PetsTypeormRepository implements PetsRepository {
  constructor(
    @inject("PetsDefaultTypeormRepository")
    private petsRepository: Repository<Pet>
  ) {}

  sortableFields: string[] = ["created_at"];

  create(props: CreatePetProps): PetModel {
    return this.petsRepository.create(props);
  }

  async insert(model: PetModel): Promise<PetModel> {
    return this.petsRepository.save(model);
  }

  async findById(id: string): Promise<Pet> {
    return this._get(id);
  }

  async myPets(userId: string): Promise<PetModel[]> {
    const pets = await this.petsRepository.find({
      where: {
        owner: {
          id: userId,
        },
      },
    });

    // if (!pets || pets.length === 0) {
    //   throw new NotFoundError("This user does not have any registered pets");
    // }

    return pets;
  }

  async update(model: PetModel): Promise<PetModel> {
    await this._get(model.id);

    await this.petsRepository.update(model.id, model);

    return model;
  }

  async delete(id: string): Promise<void> {
    await this._get(id);
    await this.petsRepository.delete(id);
  }

  async search(props: SearchInput): Promise<SearchOutput<PetModel>> {
    const validSort = this.sortableFields.includes(props.sort) || false;
    const dirOps = ["asc", "desc"];
    const validSortDir =
      (props.sort_dir && dirOps.includes(props.sort_dir.toLowerCase())) ||
      false;
    const orderByField = validSort ? props.sort : "created_at";
    const orderByDir = validSortDir ? props.sort_dir : "desc";
    const [pets, total] = await this.petsRepository.findAndCount({
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
      items: pets,
      per_page: props.per_page,
      total,
      current_page: props.page,
      sort: props.sort,
      sort_dir: props.sort_dir,
      filter: props.filter,
    };
  }

  protected async _get(id: string): Promise<Pet> {
    const pet = await this.petsRepository.findOneBy({ id });

    if (!pet) {
      throw new NotFoundError(`Pet not found using ID: ${id}`);
    }

    return pet;
  }
}
