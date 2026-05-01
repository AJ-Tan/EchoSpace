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

type UpdateProfileType = (
  id: number,
  firstName: string,
  lastName: string,
  avatar: string,
) => Promise<{
  ok: boolean;
  errors: Record<string, string>[];
  message: string;
}>;

export const updateProfile: UpdateProfileType = async (
  id,
  firstName,
  lastName,
  avatar,
) => {
  const res = await api(
    "/auth/update-profile",
    "POST",
    JSON.stringify({ id, firstName, lastName, avatar }),
  );
  const data = res.json();
  return data;
};

type AuthSwitchMemberType = (
  id: number,
  membershipPasscode: string,
) => Promise<{
  ok: boolean;
  errors: Record<string, string>[];
  message: string;
}>;

export const authSwitchMember: AuthSwitchMemberType = async (
  id,
  membershipPasscode,
) => {
  const res = await api(
    "/auth/switch-member",
    "POST",
    JSON.stringify({ id, membershipPasscode }),
  );
  const data = await res.json();
  return data;
};
