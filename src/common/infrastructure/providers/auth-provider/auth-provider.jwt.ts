import {
  AuthProvider,
  GenerateAuthKeyProps,
  VerifyAuthKeyProps,
} from "@/common/domain/providers/auth-provider";
import jwt from "jsonwebtoken";
import { env } from "../../env";
import { InvalidCredentialsError } from "@/common/domain/errors/invalid-credentials-error";

type DecodedTokenProps = {
  sub: string;
  email: string;
};

export class JwtAuthProvider implements AuthProvider {
  verifyAuthKey(token: string): VerifyAuthKeyProps {
    try {
      const decodedToken = jwt.verify(token, env.JWT_SECRET);

      const { sub, email } = decodedToken as DecodedTokenProps;
      return { user_id: sub, email };
    } catch {
      throw new InvalidCredentialsError("Invalid credeentials");
    }
  }

  generateAuthKey(user_id: string, email: string): GenerateAuthKeyProps {
    const payload = { email };
    const options: jwt.SignOptions = {
      expiresIn: "1d",
      subject: user_id,
    };

    const access_token = jwt.sign(payload, env.JWT_SECRET, options);
    return { access_token };
  }
}
