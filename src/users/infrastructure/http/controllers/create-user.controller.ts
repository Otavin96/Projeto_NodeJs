import { dataValidation } from "@/common/infrastructure/validation/zod";
import { CreateUserUseCase } from "@/users/application/usecases/create-user.usecase";
import { Request, Response } from "express";
import { container } from "tsyringe";
import z from "zod";

export async function CreateUserController(
  request: Request,
  response: Response
): Promise<Response> {
  const createUserSchemaBody = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    phone: z.string(),
  });

  const { name, email, password, phone } = dataValidation(
    createUserSchemaBody,
    request.body
  );

  const createUserUseCase =
    container.resolve<CreateUserUseCase.UseCase>("CreateUsersUseCase");

  const user = await createUserUseCase.execute({
    name,
    email,
    password,
    phone,
  });

  return response.status(201).json(user);
}
