import { dataValidation } from "@/common/infrastructure/validation/zod";
import { DeleteUserUseCase } from "@/users/application/usecases/delete-user.usecase";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";

export async function DeleteUserController(
  request: Request,
  response: Response
) {
  const deleteParamsSchema = z.object({
    id: z.string(),
  });

  const { id } = dataValidation(deleteParamsSchema, request.params);

  const deleteUserUseCase: DeleteUserUseCase.UseCase =
    container.resolve("DeleteUsersUseCase");

  await deleteUserUseCase.execute({ id });

  response.status(200).json("Usuário deletetado com sucesso!");
}
