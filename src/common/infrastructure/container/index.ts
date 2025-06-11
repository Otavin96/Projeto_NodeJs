import "@/users/infrastructure/container";
import "@/pets/infrastructure/container";
import "@/adoptions/infrastructure/container";

import { container } from "tsyringe";
import { R2Uploader } from "../providers/storage-provider/r2.uploader";
import { BcryptHashProvider } from "../providers/hash-provider/bcrypt-hash-provider";
import { JwtAuthProvider } from "../providers/auth-provider/auth-provider.jwt";

container.registerSingleton("UploaderProvider", R2Uploader);

container.registerSingleton("BcryptProvider", BcryptHashProvider);

container.registerSingleton("AuthProviderJwt", JwtAuthProvider);
