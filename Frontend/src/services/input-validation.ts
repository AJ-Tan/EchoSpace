import { api } from "../config/api";

type ValidatePropsType = { params: string; body: Record<string, string> };

type ValidateType = (props: ValidatePropsType) => Promise<{
  ok: boolean;
  errors: Record<string, string>[];
  message: string;
}>;

export const validateUserInformation: ValidateType = async ({
  params,
  body,
}) => {
  const res = await api(`/auth${params}`, "POST", JSON.stringify(body));
  const data = await res.json();
  return data;
};
