export type GenerateAuthKeyProps = {
  access_token: string;
};

export type VerifyAuthKeyProps = {
  user_id: string;
  email: string;
};

export interface AuthProvider {
  generateAuthKey(user_id: string, email: string): GenerateAuthKeyProps;
  verifyAuthKey(token: string): VerifyAuthKeyProps;
}
