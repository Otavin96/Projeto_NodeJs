import { dataValidation } from "@/common/infrastructure/validation/zod";
import { UpdatePetsUseCase } from "@/pets/application/usecase/update-pets-usecase";
import { Request, Response } from "express";
import { container } from "tsyringe";
import z from "zod";

export async function UpdatePetsController(
  request: Request,
  response: Response
): Promise<Response> {
  const updatePetsSchemaParams = z.object({
    id: z.string().uuid().optional(),
  });

  const { id } = dataValidation(updatePetsSchemaParams, request.params);

  const updatePetsSchemaBody = z.object({
    name: z.string().min(1, "Name is required").optional(),
    age: z.coerce.number().min(0, "Age must be a positive number").optional(),
    description: z.string().min(1, "Description is required").optional(),
    weight: z.coerce
      .number()
      .min(0, "Weight must be a positive number")
      .optional(),
    color: z.string().min(1, "Color is required").optional(),
  });

  const { name, age, description, weight, color } = dataValidation(
    updatePetsSchemaBody,
    request.body
  );

  const filesSchema = z
    .any()
    .refine((files) => {
      return !!files;
    }, "Files is required")
    .optional();

  const files = dataValidation(
    filesSchema,
    request.files as Express.Multer.File[] | undefined
  );

  const images = files.map((file) => ({
    filename: file.originalname.split(" ").join("-"),
    filesize: file.size,
    filetype: file.mimetype,
    body: file.buffer,
  }));

  const updatePetsUseCase: UpdatePetsUseCase.UseCase =
    container.resolve("UpdatePetsUseCase");

  const pet = await updatePetsUseCase.execute({
    id,
    name,
    age: age as number,
    description,
    weight: weight as number,
    color,
    images,
  });

  return response.status(201).json(pet);
}
