import { JwtAuthProvider } from "@/common/infrastructure/providers/auth-provider/auth-provider.jwt";
import { dataValidation } from "@/common/infrastructure/validation/zod";
import { AuthenticateUserUseCase } from "@/users/application/usecases/authenticate-user.usecase";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";

export async function AuthenticateUserController(
  request: Request,
  response: Response
) {
  const authenticateUserSchemaBody = z.object({
    email: z.string(),
    password: z.string(),
  });

  const { email, password } = dataValidation(
    authenticateUserSchemaBody,
    request.body
  );

  const authenticateUserUseCase: AuthenticateUserUseCase.UseCase =
    container.resolve("AuthenticateUserUseCase");

  const user = await authenticateUserUseCase.execute({ email, password });

  const authProviderJwt: JwtAuthProvider = container.resolve("AuthProviderJwt");

  const access_token = authProviderJwt.generateAuthKey(user.id, user.email);

  response.status(200).json({
    message: `Usuário logado com sucesso! Seja bem vindo ${user.name}`,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    },
    access_token,
  });
}
