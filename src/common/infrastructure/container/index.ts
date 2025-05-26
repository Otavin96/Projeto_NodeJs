import "@/users/infrastructure/container";

import { container } from "tsyringe";
import { R2Uploader } from "../providers/storage-provider/r2.uploader";
import { BcryptHashProvider } from "../providers/hash-provider/bcrypt-hash-provider";

container.registerSingleton("UploaderProvider", R2Uploader);
container.registerSingleton("BcryptProvider", BcryptHashProvider);
