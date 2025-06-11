import { RepositoryInterface } from "@/common/domain/repositories/repository.interface";
import { UserModel } from "../domain/models/user.model";
import { Address } from "../infrastructure/typeorm/entities/address.entity";

export type CreateUserProps = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: Address;
};

export interface UsersRepository
  extends RepositoryInterface<UserModel, CreateUserProps> {
  conflictEmail(email: string): Promise<void>;
  conflictName(name: string): Promise<void>;
  findByEmail(email: string): Promise<UserModel>;
}
