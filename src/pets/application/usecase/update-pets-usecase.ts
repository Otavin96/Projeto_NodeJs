import { inject, injectable } from "tsyringe";
import { PetsOutput } from "../dtos/pets-output.dto";
import { PetsRepository } from "@/pets/repositories/pets-repository";
import { UploaderProvider } from "@/common/domain/providers/uploader-provider";
import { randomUUID } from "crypto";

export namespace UpdatePetsUseCase {
  export type ImageInput = {
    filename: string;
    filesize: number;
    filetype: string;
    body: Buffer;
  };

  export type Input = {
    id: string;
    name?: string;
    age?: number;
    description?: string;
    weight?: number;
    color?: string;
    images?: ImageInput[];
  };

  export type Output = PetsOutput;

  export const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; //3MB

  export const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  @injectable()
  export class UseCase {
    constructor(
      @inject("PetsRepository")
      private petsRepository: PetsRepository,

      @inject("UploaderProvider")
      private uploader: UploaderProvider
    ) {}

    async execute(input: Input): Promise<Output> {
      const pet = await this.petsRepository.findById(input.id);

      if (input.name) {
        pet.name = input.name;
      }

      if (input.age) {
        pet.age = input.age;
      }

      if (input.description) {
        pet.description = input.description;
      }

      if (input.weight) {
        pet.weight = input.weight;
      }

      if (input.color) {
        pet.color = input.color;
      }

      if (input.images && input.images.length > 0) {
        for (const image of input.images) {
          if (!ACCEPTED_IMAGE_TYPES.includes(image.filetype)) {
            throw new Error("Invalid file type");
          }

          if (image.filesize > MAX_UPLOAD_SIZE) {
            throw new Error("File size exceeds the maximum limit");
          }

          const uniqueFilename = `${randomUUID()}-${image.filename}`;

          await this.uploader.upload({
            filename: uniqueFilename,
            filetype: image.filetype,
            body: image.body,
          });

          pet.images.push(uniqueFilename);
        }
      }

      const updatePet = await this.petsRepository.update(pet);

      return updatePet;
    }
  }
}
