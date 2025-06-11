import { dataValidation } from "@/common/infrastructure/validation/zod";
import { UpdateUserUseCase } from "@/users/application/usecases/update-user.usecase";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";

export async function UpdateUserController(
  request: Request,
  response: Response
): Promise<Response> {
  const updateSchemaParams = z.object({
    id: z.string(),
  });

  const { id } = dataValidation(updateSchemaParams, request.params);

  const updateUserSchemaBody = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    phone: z.string(),
  });

  const { name, email, password, phone } = dataValidation(
    updateUserSchemaBody,
    request.body
  );

  const updateUserUseCase: UpdateUserUseCase.UseCase =
    container.resolve("UpdateUsersUseCase");

  const user = await updateUserUseCase.execute({
    id,
    name,
    email,
    password,
    phone,
  });

  return response.status(200).json(user);
}
