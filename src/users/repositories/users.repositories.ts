import { RepositoryInterface } from "@/common/domain/repositories/repository.interface";
import { UserModel } from "../domain/models/user.model";

export type CreateUserProps = {
  name: string;
  email: string;
  password: string;
  phone: string;
};

export interface UsersRepository
  extends RepositoryInterface<UserModel, CreateUserProps> {}
