import { dataValidation } from "@/common/infrastructure/validation/zod";
import { DeletePetsUseCase } from "@/pets/application/usecase/delete-pets-usecase";
import { Response, Request } from "express";
import { container } from "tsyringe";
import { z } from "zod";

export async function DeletePetsController(
  request: Request,
  response: Response
): Promise<Response> {
  const deletePetsSchemaParams = z.object({
    id: z.string().uuid(),
  });

  const { id } = dataValidation(deletePetsSchemaParams, request.params);

  const deletePetsUseCase: DeletePetsUseCase.UseCase =
    container.resolve("DeletePetsUseCase");

  await deletePetsUseCase.execute({ id });

  return response.status(200).json({ message: "Pet deleted successfully" });
}
