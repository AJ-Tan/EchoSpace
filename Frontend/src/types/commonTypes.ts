export type UserType = {
  id: number;
  username: string;
  name: string;
  avatar_id: string;
  role: string;
} | null;

export type DisplayItemType = {
  id: string;
  ok: boolean;
  message: string;
};
