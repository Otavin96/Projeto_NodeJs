import { inject, injectable } from "tsyringe";
import { PetsOutput } from "../dtos/pets-output.dto";
import { PetsRepository } from "@/pets/repositories/pets-repository";
import { BadRequestError } from "@/common/domain/errors/bad-request.error";
import { User } from "@/users/infrastructure/typeorm/entities/users.entity";
import { UploaderProvider } from "@/common/domain/providers/uploader-provider";
import { randomUUID } from "crypto";

export namespace CreatePetsUseCase {
  /**
   * Use case for creating a new pet.
   * It validates the input, uploads images, and saves the pet to the repository.
   * @namespace CreatePetsUseCase
   */
  export type ImageInput = {
    filename: string;
    filesize: number;
    filetype: string;
    body: Buffer;
  };

  export type Input = {
    name: string;
    age: number;
    description: string;
    weight: number;
    color: string;
    available?: boolean;
    images: ImageInput[];
    owner: User;
  };

  export type Output = PetsOutput;

  export const MAX_UPLOAD_SIZE = 1024 * 1024 * 5; //5MB

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
      if (
        !input.name ||
        input.age < 0 ||
        !input.description ||
        input.weight < 0 ||
        !input.color ||
        !input.owner
      ) {
        throw new BadRequestError("Input data not provedid or invalid");
      }

      const filenames: string[] = [];

      for (const image of input.images) {
        if (!ACCEPTED_IMAGE_TYPES.includes(image.filetype)) {
          throw new BadRequestError("Invalid file type");
        }

        if (image.filesize > MAX_UPLOAD_SIZE) {
          throw new BadRequestError("File size must be less than 3MB");
        }

        const uniqueFilename = `${randomUUID()}-${image.filename}`;

        await this.uploader.upload({
          filename: uniqueFilename,
          filetype: image.filetype,
          body: image.body,
        });

        filenames.push(uniqueFilename);
      }

      const pet = this.petsRepository.create({
        ...input,
        images: filenames,
      });

      const createdPet: PetsOutput = await this.petsRepository.insert(pet);

      return createdPet;
    }
  }
}
