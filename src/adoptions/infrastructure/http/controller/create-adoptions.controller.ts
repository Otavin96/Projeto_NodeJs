import { CreateAdoptionUseCase } from "@/adoptions/application/usecase/create-adoption.usecase";
import { dataValidation } from "@/common/infrastructure/validation/zod";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";

export async function CreateAdoptionController(
  request: Request,
  response: Response
): Promise<Response> {
  const createAdoptionSchemaBody = z.object({
    pet: z.string().uuid(),
    adopter: z.string().uuid(),
  });

  const { pet, adopter } = dataValidation(
    createAdoptionSchemaBody,
    request.body
  );

  const createAdoptionUseCase: CreateAdoptionUseCase.UseCase =
    container.resolve("CreateAdoptionsUseCase");

  const adoption = await createAdoptionUseCase.execute({
    pet,
    adopter,
  });
  return response.status(201).json(adoption);
}
