import { dataValidation } from "@/common/infrastructure/validation/zod";
import { CreatePetsUseCase } from "@/pets/application/usecase/create-pets-usecase";
import { Response, Request } from "express";
import { container } from "tsyringe";
import z from "zod";

export async function CreatePetsController(
  request: Request,
  response: Response
): Promise<Response> {
  const createPetsSchemaBody = z.object({
    name: z.string().min(1, "Name is required"),
    age: z.coerce.number().min(0, "Age must be a positive number"),
    description: z.string().min(1, "Description is required"),
    weight: z.coerce.number().min(0, "Weight must be a positive number"),
    color: z.string().min(1, "Color is required"),
    available: z.boolean().optional(),
    owner: z.string().uuid("Owner ID must be a valid UUID"),
  });

  // Validate the request body against the schema
  const { name, age, description, weight, color, available, owner } =
    dataValidation(createPetsSchemaBody, request.body);

  const filesSchema = z.any().refine((files) => {
    return !!files;
  }, "Files is required");

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

  const createPetsUseCase: CreatePetsUseCase.UseCase =
    container.resolve("CreatePetsUseCase");

  const pet = await createPetsUseCase.execute({
    name,
    age: age as number,
    description,
    weight: weight as number,
    color,
    available,
    images,
    owner,
  });
  return response.status(201).json(pet);
}
