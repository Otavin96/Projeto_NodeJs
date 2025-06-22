import { dataValidation } from "@/common/infrastructure/validation/zod";
import { MyPetsUseCase } from "@/pets/application/usecase/my-pets-usecase";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";

export async function MyPetsController(request: Request, response: Response) {
  const myPetsSchemaParams = z.object({
    id: z.string(),
  });

  const { id } = dataValidation(myPetsSchemaParams, request.params);

  const myPetsUseCase: MyPetsUseCase.UseCase =
    container.resolve("MyPetsUseCase");

  const pets = await myPetsUseCase.execute({ id });

  return response.status(200).json(pets);
}
