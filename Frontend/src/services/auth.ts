import { api } from "../config/api";

export const authSignIn = async (userInputs: Record<string, string>) => {
  const res = await api("/auth/signin", "POST", JSON.stringify(userInputs));
  const data = await res.json();
  return data;
};

type authSignUpType = (
  userInputs: Record<string, string | boolean>,
) => Promise<{
  ok: boolean;
  errors: Record<string, string>[];
  message: string;
}>;

export const authSignUp: authSignUpType = async (
  userInputs: Record<string, string | boolean>,
) => {
  const res = await api("/auth/signup", "POST", JSON.stringify(userInputs));
  const data = await res.json();
  return data;
};

export const authSignOut = async () => {
  const res = await api("/auth/signout", "POST");
  const data = await res.json();
  return data;
};

export const authProtected = async () => {
  const res = await api("/protected");
  const data = await res.json();
  return data;
};
