import { AdoptionModel } from "@/adoptions/domain/adoption-model";
import {
  AdoptionRepository,
  CreateAdotionProps,
} from "@/adoptions/repositories/adoption-repository";
import {
  SearchInput,
  SearchOutput,
} from "@/common/domain/repositories/repository.interface";
import { inject, injectable } from "tsyringe";
import { ILike, Repository } from "typeorm";
import { Adoption } from "../entities/adoption.entity";
import { NotFoundError } from "@/common/domain/errors/not-found-error";

@injectable()
export class AdoptionTypeOrmRepository implements AdoptionRepository {
  sortableFields: string[] = ["createdAt"];

  constructor(
    @inject("AdoptionsDefaultTypeOrmRepository")
    private adoptionsRepository: Repository<Adoption>
  ) {}

  create(props: CreateAdotionProps): AdoptionModel {
    return this.adoptionsRepository.create(props);
  }

  async insert(model: AdoptionModel): Promise<AdoptionModel> {
    return this.adoptionsRepository.save(model);
  }
  async findById(id: string): Promise<AdoptionModel> {
    return this._get(id);
  }

  async update(model: AdoptionModel): Promise<AdoptionModel> {
    await this._get(model.id);
    await this.adoptionsRepository.update(model.id, model);

    return model;
  }

  async delete(id: string): Promise<void> {
    await this._get(id);

    await this.adoptionsRepository.delete(id);
  }

  async search(props: SearchInput): Promise<SearchOutput<AdoptionModel>> {
    const validSort = this.sortableFields.includes(props.sort) || false;
    const dirOps = ["asc", "desc"];
    const validSortDir =
      (props.sort_dir && dirOps.includes(props.sort_dir.toLowerCase())) ||
      false;
    const orderByField = validSort ? props.sort : "created_at";
    const orderByDir = validSortDir ? props.sort_dir : "desc";
    const [adoptions, total] = await this.adoptionsRepository.findAndCount({
      ...(props.filter && {
        where: {
          pet: ILike(props.filter),
        },
      }),
      order: {
        [orderByField]: orderByDir,
      },
      skip: (props.page - 1) * props.per_page,
      take: props.per_page,
    });
    return {
      items: adoptions,
      per_page: props.per_page,
      total,
      current_page: props.page,
      sort: props.sort,
      sort_dir: props.sort_dir,
      filter: props.filter,
    };
  }

  protected async _get(id: string): Promise<AdoptionModel> {
    const adoption = await this.adoptionsRepository.findOneBy({
      id,
    });

    if (!adoption) {
      throw new NotFoundError(`Adoption with id ${id} not found`);
    }

    return adoption;
  }
}
