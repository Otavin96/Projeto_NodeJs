import { dataValidation } from "@/common/infrastructure/validation/zod";
import { DeletePetsUseCase } from "@/pets/application/usecase/delete-pets-usecase";
import { GetPetUseCase } from "@/pets/application/usecase/get-pet-usecase";
import { Response, Request } from "express";
import { container } from "tsyringe";
import { z } from "zod";

export async function GetPetController(
  request: Request,
  response: Response
): Promise<Response> {
  const getPetSchemaParams = z.object({
    id: z.string().uuid(),
  });

  const { id } = dataValidation(getPetSchemaParams, request.params);

  const getPetUseCase: GetPetUseCase.UseCase =
    container.resolve("GetPetUseCase");

  const pet = await getPetUseCase.execute({ id });

  return response.status(200).json(pet);
}
