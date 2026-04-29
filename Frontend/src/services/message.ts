import { api } from "../config/api";

type writeMessageType = (
  user_id: number,
  title: string,
  message: string,
  id?: string,
) => Promise<{
  ok: boolean;
  errors: Record<string, string>[];
  message: string;
}>;

export const writeMessage: writeMessageType = async (
  user_id,
  title,
  message,
  id = "",
) => {
  const res = await api(
    `/message/${id}`,
    "POST",
    JSON.stringify({ user_id, title, message }),
  );

  const data = await res.json();
  return data;
};

export const getMessage = async ({
  id = "",
  user_id = "",
}: {
  id?: string;
  user_id?: string;
} = {}) => {
  const res = await api(
    user_id ? `/message/user/${user_id}` : `/message/${id}`,
    "GET",
  );
  const data = await res.json();
  return data;
};
