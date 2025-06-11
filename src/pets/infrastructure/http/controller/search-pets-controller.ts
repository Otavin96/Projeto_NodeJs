import { dataValidation } from "@/common/infrastructure/validation/zod";
import z from "zod";
import { Request, Response } from "express";
import { SearchPetsUseCase } from "@/pets/application/usecase/search-pets-usecase";
import { container } from "tsyringe";

export async function SearchPetsController(
  request: Request,
  response: Response
): Promise<Response> {
  const searchPetsSchemaQuery = z.object({
    page: z.coerce.number().optional(),
    per_page: z.coerce.number().optional(),
    sort: z.string().optional(),
    sort_dir: z.string().optional(),
    filter: z.string().optional(),
  });

  const { page, per_page, sort, sort_dir, filter } = dataValidation(
    searchPetsSchemaQuery,
    request.query
  );

  const searchPetsUseCase: SearchPetsUseCase.UseCase =
    container.resolve("SearchPetsUseCase");

  const pets = await searchPetsUseCase.execute({
    page: page ?? 1,
    per_page: per_page ?? 10,
    sort: sort ?? null,
    sort_dir: sort_dir ?? null,
    filter: filter ?? null,
  });

  return response.status(200).json(pets);
}
